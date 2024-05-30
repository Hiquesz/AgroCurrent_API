import { Request, Response } from 'express'
import Sensor from '../../models/sensor.entity'
import User from '../../models/user.entity'
import Arrival from '../../models/arrival.entity'
import Report from '../../models/report.entity'
import { Raw } from 'typeorm'


export default class SensorController {
    static async store(req: Request, res: Response){
        const { time, part_machine, localization, arrivalId } = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
        
        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }          

        if (!time || !part_machine || !localization || !arrivalId){
            return res.status(400).json({erro: 'Todas as informações são obrigatórias!'})
        }

        //gerar notificacao de sensor apenas se a chegada não possuir relatorio ainda
        const arrival = await Arrival.findOne({where: { 
          date_arrival: Raw(date_arrival => `${date_arrival} IS NOT NULL`),
          id: Number(arrivalId)
        }})
        if (!arrival) return res.status(404).json({error:'Chegada não encontrada'})
        
        const report = await Report.findOne({relations:['arrival'], where: {arrival: arrivalId}})
        if (report) {
          if(Number(report.arrival.id !== arrivalId)){
            const sensor = new Sensor()
            sensor.time = time
            sensor.part_machine = part_machine
            sensor.localization = localization
            sensor.arrival = arrival
            await sensor.save()
            return res.status(201).json(sensor) }
          }
          return res.status(400).json({error: 'A notifição do sensor só pode ser atribuída em chegadas sem relatório'})
        }

    /*static async index(req: Request, res: Response){
        const { userId } = req.headers
        const { id } = req.params

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })        

        const sensor = await Sensor.find({where: { id: Number(id) }})

        return res.status(200).json(sensor)
    }*/

    static async show (req: Request, res: Response){
        const { id } = req.params 
        const { userId } = req.headers

        if (!id || isNaN(Number(id))) 
	        return res.status(400).json({erro: 'O id do alarme do sensor é obrigatório'})

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const sensor = await Sensor.findOne({where: {id: Number(id)}, relations:['arrival']})
        
        if (!sensor) 
	        return res.status(404)

        return res.json(sensor)    
    }

    static async delete (req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id do alarme do sensor é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }          
    
        const sensor = await Sensor.findOneBy({id: Number(id)})
        if (!sensor) {
          return res.status(404).json({ error: 'Alarme do sensor não encontrado' })
        }
    
        //apagar notificacao de sensor apenas se a chegada não possuir relatorio ainda
        const arrival = await Arrival.findOne({where: { 
          date_arrival: Raw(date_arrival => `${date_arrival} IS NOT NULL`),
          id: Number(sensor.arrival.id)
        }})
        if (!arrival) return res.status(404).json({error:'Chegada não encontrada'})
        
        const report = await Report.findOne({relations:['arrival'], where: {arrival: sensor.arrival}})
        if (report) {
          if(Number(report.arrival.id !== sensor.arrival.id)){
            await sensor.remove()
            return res.status(204).json()
      }
    }
    return res.status(400).json({error: 'A notifição do sensor só pode ser atribuída em chegadas sem relatório'})
  }

      /*static async update (req: Request, res: Response) {
        const { id } = req.params
        const { time, part_machine, localization } = req.body
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id do alarme do sensor é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }

        const sensor = await Sensor.findOneBy({id: Number(id)})
        if (!sensor) {
          return res.status(404).json({ error: 'Alarme do sensor não encontrado' })
        }
    
        sensor.time = time ?? sensor.time
        sensor.part_machine = part_machine ?? sensor.part_machine
        sensor.localization = localization ?? sensor.localization
        await sensor.save()
    
        return res.json(sensor)
      }*/
    }