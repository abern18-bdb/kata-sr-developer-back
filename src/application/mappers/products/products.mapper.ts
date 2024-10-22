import {
	BdbHeaders,
	DocumentTypes,
	HeaderModel,
	Log,
} from '@npm-bbta/bbog-dig-evo-express-common-lib';
import { ProductsResponseApiModel } from '../../../domain/products/products-response-api.model';

export class ProductsMapper {
	@Log()
	public static map<O>(input: ProductsResponseApiModel): O {
		return {
			rqUID: input.RqUID,
		} as unknown as O;
	}

	public static mapToHeaderModel<O>(input: HeaderModel): O {
		return {
			channel: input[BdbHeaders.XChannel],
			custIdentNum: input[BdbHeaders.XCustidentnum],
			custIdentType: input[BdbHeaders.XCustidenttype] as DocumentTypes,
		} as unknown as O;
	}
}
