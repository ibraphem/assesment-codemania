import { Dialect, Sequelize } from 'sequelize'
import dotenv from "dotenv"

dotenv.config();

const dbName = process.env.PG_DB as string
const dbUser = process.env.PG_USER as string
const dbHost = process.env.PG_HOST
const dbDriver = process.env.PG_DRIVER as Dialect
const dbPassword = process.env.PG_PASSWORD


const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver
})

export default sequelizeConnection