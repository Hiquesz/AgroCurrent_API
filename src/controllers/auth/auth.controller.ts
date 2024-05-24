import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../../models/user.entity'
import Token from '../../models/token.entity'

export default class AuthController{
    static async store (req: Request, res: Response){
        const { name,email,password,category } = req.body
        const { userId } = req.headers

        if(!name) return res.status(400).json({error: "Nome obrigatório!"})
        if(!email || !password) return res.status(400).json({error: "Email e senha obrigatórios!"})
        if(!category) return res.status(400).json({error: "Categoria obrigatória"})

        // verificacao se o email ja esta cadastrado
        const userCheck = await User.findOneBy({ email })
        if (userCheck) return res.status(400).json({ error: 'Email já cadastrado' })

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        //validacao de categoria de usuario para permissao de acesso
        const adm = await User.findOneBy({id: Number(userId)})
        if (adm?.category == "Consultor" || adm?.category == "Registrador"){
         return res.status(403).json({erro: 'Você não possui permissão de acesso'})
    }             

        const user = new User()
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password, 10)
        user.category = category

        await user.save()

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            category: user.category
        }) 
    }

    static async login (req: Request, res: Response){
        const {email, password} = req.body

        if (!email || !password) return res.status(400).json({error: "Email e senha são obrigatórios"})

        const user = await User.findOneBy ({email})
        if (!user) return res.status(401).json({error: "Usuário não encontrado"})

        const passwCheck = bcrypt.compareSync(password, user.password)
        if (!passwCheck) return res.status(401).json({error: "Senha inválida"})

        await Token.delete({user: {id: user.id}})

        const token = new Token()
        
        const stringRand = user.id + new Date().toString() 
        token.token = bcrypt.hashSync(stringRand, 1).slice(-20)

        token.expiredAt = new Date (Date.now()+60*60*1000) //expirar token em 1 hora

        token.refreshToken = bcrypt.hashSync(stringRand+2, 1).slice(-20)

        token.user = user
        await token.save()

        //add o token em um cookie
        res.cookie('token', token.token, {httpOnly: true, secure: true, sameSite: 'none'})

        return res.json({
            token: token.token,
            expiredAt: token.expiredAt,
            refreshToken: token.refreshToken
        })
    }

    static async refresh (req: Request, res: Response) {
        const { authorization } = req.headers
    
        if (!authorization) return res.status(400).json({ error: 'O refresh token é obrigatório' })
    
        const token = await Token.findOneBy({ refreshToken: authorization })
        if (!token) return res.status(401).json({ error: 'Refresh token inválido' })
    
        if (token.expiredAt < new Date()) {
          await token.remove()
          return res.status(401).json({ error: 'Refresh token expirado' })
        }
    
        token.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
        token.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20)
        token.expiredAt = new Date(Date.now() + 60 * 60 * 1000)
        await token.save()

        //add o token em um cookie
        res.cookie('token', token.token, {httpOnly: true, secure: true, sameSite: 'none'})
    
        return res.json({
          token: token.token,
          expiresAt: token.expiredAt,
          refreshToken: token.refreshToken
        })
    }

    static async logout (req: Request, res: Response) {
        const { authorization } = req.headers
        
        if (!authorization) return res.status(400).json({ error: 'O token é obrigatório' })
    
        const userToken = await Token.findOneBy({ token: authorization })
        if (!userToken) return res.status(401).json({ error: 'Token inválido' })
    
        await userToken.remove()

        res.clearCookie('token')
    
        return res.status(204).json()
    }
}