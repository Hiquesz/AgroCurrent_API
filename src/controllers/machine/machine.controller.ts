import { Request, Response } from 'express'
import Machine from '../../models/machine.entity'
import User from '../../models/user.entity'

export default class MachineController {
    static async store(req: Request, res: Response){
        const { name, type } = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
        
        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }

        if (!name || !type){
            return res.status(400).json({erro: 'Nome da máquina e seu tipo são obrigatórios!'})
        }

        const machine = new Machine()
        machine.name = name
        machine.type = type

        await machine.save()

        return res.status(201).json(machine)
    }

    /*static async index(req: Request, res: Response){
      const { userId } = req.headers
      const { id } = req.params

      if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

      const machine = await Machine.find({where: { id: Number(id) }})

      return res.status(200).json(machine)
  }*/

    static async show (req: Request, res: Response){
        const { id } = req.params 
        const { userId } = req.headers

        if (!id || isNaN(Number(id))) 
	        return res.status(400).json({erro: 'O id da máquina é obrigatório'})

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })        

        const machine = await Machine.findOneBy({id: Number(id)})
        
        if (!machine) 
	        return res.status(404)

        return res.json(machine)    
    }

    static async delete (req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id da máquina é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
        
        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }        

        const machine = await Machine.findOneBy({id: Number(id)})
        if (!machine) {
          return res.status(404).json({ error: 'Máquina não encontrada' })
        }
    
        await machine.remove()
        return res.status(204).json()
      }

      static async update (req: Request, res: Response) {
        const { id } = req.params
        const { name, type } = req.body
        const { userId } = req.headers
    
        if(!id || isNaN(Number(id))) {
          return res.status(400).json({ error: 'O id da máquina é obrigatório' })
        }
    
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
          
        //validacao de categoria de usuario para permissao de acesso
        const user = await User.findOneBy({id: Number(userId)})
        if (user?.category == "Consultor"){
          return res.status(403).json({erro: 'Você não possui permissão de acesso'})
        }

        const machine = await Machine.findOneBy({id: Number(id)})
        if (!machine) {
          return res.status(404).json({ error: 'Máquina não encontrada' })
        }
    
        machine.name = name ?? machine.name
        machine.type = type ?? machine.type
        await machine.save()
    
        return res.json(machine)
      }
}