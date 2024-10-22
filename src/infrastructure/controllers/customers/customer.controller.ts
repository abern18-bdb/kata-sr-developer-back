import { customerService } from '../../../application/services/customers/customer.service';
import { CustomerResponseModel } from '../../../domain/customers/customer-response.model';
import { CustomerMapper } from '../../../application/mappers/customers/customer.mapper';
import { NextFunction, Request, Response } from 'express';
import { productsService } from '../../../application/services/products/products.service';
import { ProductsResponseModel } from '../../../domain/products/products-response.model';
import { ProductsMapper } from '../../../application/mappers/products/products.mapper';
import { EventTypes, HeaderModel } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain';
import { Controller, Log } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/infrastructure';
import {
	GET_CUSTOMER_CONTROLLER_MODEL,
	GET_PRODUCT_CONTROLLER_MODEL
} from "../../../domain/constants/controller.constants";

export class CustomerController {
	@Controller(GET_CUSTOMER_CONTROLLER_MODEL)
	@Log()
	public static getCustomer(
		req: Request,
		_res: Response,
		_next: NextFunction
	): Promise<CustomerResponseModel> {
		return customerService.query(
			CustomerMapper.mapToHeaderModel(req.headers as unknown as HeaderModel)
		);
	}

	@Controller(GET_PRODUCT_CONTROLLER_MODEL)
	@Log()
	public static getProduct(
		req: Request,
		_res: Response,
		_next: NextFunction
	): Promise<ProductsResponseModel> {
		return productsService.command({
			body: req.body,
			headers: ProductsMapper.mapToHeaderModel(req.headers as unknown as HeaderModel),
		});
	}
}
