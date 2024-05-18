import { Request, Response } from 'express'
import Arrival from '../../models/arrival.entity'
import User from '../../models/user.entity'

export default class ArrivalController {
    /*static async store(req: Request, res: Response){
        const { date_inspection, date_arrival } = req.body
        const { userId } = req.headers
        const { departureId } = req.params //vincular saida e chegada

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }          

        if (!date_inspection || !date_arrival){
            return res.status(400).json({erro: 'Todas as informações são obrigatórias!'})
        }

        verificar se saida ja existe
        const departureExists = Departure.findOneBy({id: Number(departureId)})

        const departureHaveArrival = Arrival.find({where: {departureId: Number(departureId)}})
        if (!departureId || !departureExists || !departureHaveArrival){
          return res.status(400).json({erro: 'É necessário uma saída que não possua uma chegada para fazer um vinculo'})
        }

        const arrival = new Arrival()
        arrival.date_inspection = date_inspection
        arrival.date_arrival = date_arrival
        arrival.userId = Number(userId)
        arrival.departureId = Number(departureId)

        await arrival.save()

        return res.status(201).json(arrival)
    }
    */

    static async index (req: Request, res: Response){
      const { departureId } = req.params 
      const { userId } = req.headers

      if (!departureId || isNaN(Number(departureId))) 
        return res.status(400).json({erro: 'O id da saída é obrigatório'})

      if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

      const arrival = await Arrival.findOneBy({departureId: Number(departureId)})
      if (!arrival) 
        return res.status(404)

      return res.json(arrival)    
  }

    static async delete (req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id da chegada é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }          
    
        const arrival = await Arrival.findOneBy({id: Number(id)})
        if (!arrival) {
          return res.status(404).json({ error: 'Chegada não encontrada' })
        }
    
        await arrival.remove()
        return res.status(204).json()
      }

      static async update (req: Request, res: Response) {
        const { id } = req.params
        const { date_inspection, date_arrival } = req.body
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }          
    
        //validacao do vinculo entre saida e chegada
        const arrival = await Arrival.findOneBy({id: Number(id)})
        if (!arrival) {
          return res.status(401).json({ error: 'Saída não encontrada' })
        }
    
        arrival.date_arrival = date_arrival ?? arrival.date_arrival
        arrival.date_inspection = date_inspection ?? arrival.date_inspection
        await arrival.save()
    
        return res.json(arrival)
      }
}