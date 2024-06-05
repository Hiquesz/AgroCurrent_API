import express from 'express'
import dataBase from './database/ormconfig'
import routes from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['https://agrocurrent-api.onrender.com', 'http://localhost:5173'],
    credentials: true
}))

app.use(routes)

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
    console.log(dataBase.isInitialized ? 'Banco OK!' : 'Banco carregando...')
})