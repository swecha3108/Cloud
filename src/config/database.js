import dotenv  from "dotenv"
import logger from '../config/logger.js'
dotenv.config();

import { Sequelize } from "sequelize";
const sequelize = new Sequelize('postgres://'+(process.env.DATABASE_USER || "postgres")+':'+(process.env.DATABASE_Password || "postgres")+'@'+(process.env.DATABASE_HOST || "localhost")+':'+(process.env.DATABASE_PORT || "5432")+'/'+(process.env.DATABASE_NAME || "postgres"))
sequelize.authenticate().then(() => {
  logger.info('Connection has been established successfully.');
}).catch(err => {
  logger.fatal('Database connection failed\n'+ err);
});

export default sequelize;
