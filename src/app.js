import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import * as dotenv from 'dotenv';
import sequelize from './config/database.js';
import logger from './config/logger.js'
const port = 8080;
/**
 * Creating express server
 */
const app = express();
dotenv.config();

// Express Server Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

sequelize.sync();

// Custom routing
routes(app);

// Enable Server to listen on port
app.listen(port, () => {
    logger.info("server started")
    console.log(`Server listening on port ${port}`);
});

export default app