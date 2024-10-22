import CONFIG from '../../config';
import { CustomerRouter } from './customer.router';
import { Router } from 'express';

const AppRouter = Router();

[CustomerRouter].forEach((route: Router) => AppRouter.use(CONFIG.CONTEXT, route));

export { AppRouter };
