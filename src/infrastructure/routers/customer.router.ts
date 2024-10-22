import express from 'express';
import CONFIG from '../../config';
import { CustomerController } from '../controllers/customers/customer.controller';

const CustomerRouter = express.Router();

CustomerRouter.get(
	`${CONFIG.PATHS.CUSTOMERS.PATH}${CONFIG.PATHS.CUSTOMERS.OPERATIONS.CUSTOMER}`,
	CustomerController.getCustomer
);

CustomerRouter.post(
	`${CONFIG.PATHS.PRODUCTS.PATH}${CONFIG.PATHS.PRODUCTS.OPERATIONS.PRODUCTS}`,
	CustomerController.getProduct
);

export { CustomerRouter };
