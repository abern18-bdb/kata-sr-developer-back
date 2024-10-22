import CONFIG from '../../config';
import cors from 'cors';
import express, { Router } from 'express';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { OpenApiValidator } from 'express-openapi-validate';
import { EventMiddleware, FileUtility } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib';

const ValidatorRouter = Router();

[
	EventMiddleware.handler,
	cors({}),
	morgan('tiny'),
	express.json(),
	express.static(path.join(__dirname, CONFIG.RESOURCE)),
	new OpenApiValidator(FileUtility.get(CONFIG.OAS.FILE)).match(),
].forEach((middleware) => ValidatorRouter.use(CONFIG.CONTEXT, middleware));

ValidatorRouter.use(
	CONFIG.OAS.PATH,
	swaggerUi.serve,
	swaggerUi.setup(FileUtility.get(CONFIG.OAS.FILE))
);

export { ValidatorRouter };
