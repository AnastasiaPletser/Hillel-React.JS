// import { createRequire } from 'node:module'

// const require = createRequire(import.meta.url)

// import { Sequelize } from 'sequelize';

// require ('dotenv').config();
// export default new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         dialect: 'postgres',
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT
//     }
// )

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // имя базы
  process.env.DB_USER, // пользователь
  process.env.DB_PASSWORD, // пароль
  {
    dialect: "postgres", // или "mysql" если хочешь MySQL
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false // убрать лишние логи
  }
);

export default sequelize;
