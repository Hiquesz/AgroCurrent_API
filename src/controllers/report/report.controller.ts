import Arrival from '../../models/arrival.entity'
import Report from '../../models/report.entity'
import { Request, Response } from 'express'
import User from '../../models/user.entity'
import Departure from '../../models/departure.entity'
import Sensor from '../../models/sensor.entity'

export default class ReportController {
    static async store(req: Request, res: Response){
        const { arrivalId } = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor" || user?.category == "Registrador" || !user){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }
        if (!arrivalId) return res.status(400).json({erro: 'O id da chegada é obrigatório'})
        
        //validacao da chegada
        const arrival = await Arrival.findOneBy({id: Number(arrivalId)})
        if (!arrival) return res.status(400).json({error: 'A chegada escolhida não existe'})

        const report = new Report()
        report.arrival = arrival
        report.user = user

        await report.save()
        return res.status(201).json(report)

    }

    /*static async index(req: Request, res: Response){
        const { userId } = req.headers
        const { id } = req.params

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const report = await Report.find({where: { id: Number(id) }})

        return res.status(200).json(report)
    }*/

    static async show (req: Request, res: Response){
        const { id } = req.params 
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!id || isNaN(Number(id))) 
	        return res.status(400).json({erro: 'O id do relatório é obrigatório'})
        const report = await Report.find({select: ["arrival"], where: {id: Number(id)}})
        if (!report) return res.status(404)
      
      const arrival = await Arrival.find({where: {id: Number(report)}})
      const departure = await Departure.find({where: {id: Number(arrival)}})
      const sensors = await Sensor.find({relations: ['arrival']})

        return res.json({report, departure, sensors})    
    }

    static async delete (req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id do relatório é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
    
        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }

        const report = await Report.findOneBy({id: Number(id)})
        if (!report) {
          return res.status(404).json({ error: 'Relatório não encontrado' })
        }
    
        await report.remove()
        return res.status(204).json()
      }

}