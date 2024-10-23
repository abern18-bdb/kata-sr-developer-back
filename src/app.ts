import express from 'express';
import { initDatabase } from './database';
import TaskRouter from './infrastructure/routers/taskRouter';
import CONFIG from './config';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { Utils } from './application/utils/utils.service';

const app = express();

app.use(express.json());
app.use(CONFIG.CONTEXT, TaskRouter);

const swaggerFilePath = path.join(CONFIG.RESOURCE, CONFIG.OAS.FILE);
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
app.use(`${CONFIG.CONTEXT}${CONFIG.OAS.PATH}`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

export const startDatabase = async () => {
    try {
        await initDatabase();
        Utils.LOGGER.info(`Servidor escuchando en http://localhost:${CONFIG.PORT}${CONFIG.CONTEXT}`);
    } catch (error) {
        Utils.LOGGER.error('Error inicializando la base de datos:', error);
        process.exit(1);
    }
};
