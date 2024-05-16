import { join } from "path"
import { DataSource } from "typeorm"

const dataBase = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities: [
        join (__dirname, '..', 'models/*.{ts,js}')
    ]
})

dataBase.initialize()
.then(() => {
    console.log("Banco de dados iniciado!")
})
.catch(() => {
    console.log("Falha ao iniciar o banco de dados")
})

export default dataBase