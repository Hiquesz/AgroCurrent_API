import { Request, Response } from 'express'
import Departure from '../../models/departure.entity'
import User from '../../models/user.entity'
import Images_Departure from '../../models/images_dep.entity'
import Arrival from '../../models/arrival.entity'

export default class DepartureImagesController {
    static async store(req: Request, res: Response){
        const { departureId } = req.params
        const { address_image } = req.body
        const { userId } = req.headers

        //verificacao de autenticacao do usuário
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!departureId || isNaN(Number(departureId))) return res.status(400).json({error: 'Defina o id de saída válido'})
        const departure = await Departure.findOneBy({id: Number(departureId)})
        if (!departure) return res.status(400).json({error: 'Defina o id de uma saída existente'})

        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }          

        if (!address_image){
            return res.status(400).json({erro: 'O endereço da imagem não é válido!'})
        }

        //a saida só pode receber imagens caso n tenha chego ainda
        const arrival = await Arrival.findOneBy({id: Number(departureId)})
        if (arrival?.date_inspection) { //data so é lancada quando arrival realmente existe
          return res.status(404).json({ error: 'Esta saída possui chegada e não pode recebr imagens' })
        }

        const imageD = new Images_Departure()
        imageD.address_image = address_image
        imageD.departure = departure

        await imageD.save()

        return res.status(201).json(imageD)
    }

    static async show (req: Request, res: Response){
        const { userId } = req.headers
        const { departureId } = req.params

         if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })  

        const departure = await Departure.findOneBy({id: Number(departureId)})
        if(!departure) res.status(404).json({error: 'Esta saída não existe'})

        const images = await Images_Departure.find({where: {
            departure: { id:Number(departureId)} } })
        if (images.length === 0) return res.json({msg: 'Esta sáida não possui imagens'})
        
            return res.json(images)   
     }

    static async delete (req: Request, res: Response) {
        const { id } = req.body
        const { departureId } = req.params
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

        const imageD = await Images_Departure.findOneBy({id: Number(id)})
        if (!imageD) {
          return res.status(404).json({ error: 'Imagem não encontrada' })
        }
        
        //a saida só pode ter uma imagem apagada caso n tenha chego ainda
        const arrival = await Arrival.findOneBy({id: Number(departureId)})
        if (arrival?.date_inspection) { //data so é lancada quando arrival realmente existe
          return res.status(404).json({ error: 'Esta saída possui chegada e não pode ter suas imagens apagadas' })
        }
        await imageD.remove()
        return res.status(204).json()
      }
}