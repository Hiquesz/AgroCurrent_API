import { Request, Response } from 'express'
import Departure from '../../models/departure.entity'
import User from '../../models/user.entity'
import Report from '../../models/report.entity'
import Arrival from '../../models/arrival.entity'
import Images_Arrival from '../../models/images_arrival.entity'

export default class ArrivalImagesController {
    static async store(req: Request, res: Response){
        const { arrivalId } = req.params
        const { address_image } = req.body
        const { userId } = req.headers

        //verificacao de autenticacao do usuário
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!arrivalId || isNaN(Number(arrivalId))) return res.status(400).json({error: 'Defina o id de saída válido'})
        const arrival = await Arrival.findOneBy({id: Number(arrivalId)})
        if (!arrival) return res.status(400).json({error: 'Defina o id de uma chegada existente'})

        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }          

        if (!address_image){
            return res.status(400).json({erro: 'O endereço da imagem não é válido!'})
        }

        //o trajeto só pode cadastrar imagens caso n tenha relatorio ainda
        const report = await Report.findOne({where: {arrival: arrival}})
        if(!report) {
          const imageA = new Images_Arrival()
          imageA.address_image = address_image
          imageA.arrival = arrival

          await imageA.save()

          return res.status(201).json(imageA)
        }
        return res.json({msg: 'Este trajeto possui relatorio e nao pode ter suas imagens alteradas'})      
        
    }

    static async show (req: Request, res: Response){
        const { userId } = req.headers
        const { arrivalId } = req.params

         if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })  

        const arrival = await Arrival.findOneBy({id: Number(arrivalId)})
        if(!arrival) res.status(404).json({error: 'Esta chegada não existe'})

        const images = await Images_Arrival.find({where: {
            arrival: { id:Number(arrivalId)} } })
        if (images.length === 0) return res.json({msg: 'Esta chegada não possui imagens'})
            return res.json(images)   
     }

    static async delete (req: Request, res: Response) {
        const { id } = req.body
        const { arrivalId } = req.params
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id da imagem é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
          
        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }

        if (!arrivalId || isNaN(Number(arrivalId))) return res.status(400).json({error: 'Defina o id de saída válido'})
        
        const arrival = await Arrival.findOneBy({id: Number(arrivalId)})
        if (!arrival) return res.status(400).json({error: 'Defina o id de uma chegada existente'})
        
        const imageA = await Images_Arrival.findOneBy({id: Number(id)})
        if (!imageA) {
          return res.status(404).json({ error: 'Imagem não encontrada' })
        }
        //o trajeto só pode cadastrar imagens caso n tenha relatorio ainda
        const report = await Report.findOne({where: {arrival: arrival}})
       if(!report) {
        await imageA.remove()
        return res.status(204).json()
}
    return res.json({msg: 'Este trajeto possui relatorio e nao pode ter suas imagens alteradas'})      

      }
}