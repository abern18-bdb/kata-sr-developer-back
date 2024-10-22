import express from 'express';
import { ValidatorRouter } from './infrastructure/routers/validator.router';
import { AppRouter } from './infrastructure/routers/app.router';
import { ErrorMiddleware } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/infrastructure/middleware/error.middleware';

const app = express();
app.disable('x-powered-by');
app.use(ValidatorRouter);
app.use(AppRouter);
app.use(ErrorMiddleware.handler);

export default app;
