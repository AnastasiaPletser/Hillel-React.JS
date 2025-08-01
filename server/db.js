import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
import { Sequelize } from 'sequelize';
require ('dotenv').config();
export default new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)
