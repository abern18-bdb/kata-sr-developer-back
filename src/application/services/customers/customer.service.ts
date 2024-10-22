import { CustomerRequestModel } from '../../../domain/customers/customer-request.model';
import { CustomerResponseApiModel } from '../../../domain/customers/customer-response-api.model';
import CONFIG from '../../../config';
import { CustomerResponseModel } from '../../../domain/customers/customer-response.model';
import { CustomerMapper } from '../../mappers/customers/customer.mapper';
import { DocumentTypesMap } from '../../../domain/enums/document-types.enum';
import {
	DocumentTypes,
	GenericQueryService,
} from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain';
import { StringUtility } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/application/utilities/string.utility';
import {
	Log,
	RestAdapter,
	Cache,
} from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/infrastructure';

class CustomerService
	implements GenericQueryService<CustomerRequestModel, Promise<CustomerResponseModel>>
{
	@Log()
	@Cache<CustomerResponseModel>()
	async query(params: CustomerRequestModel): Promise<CustomerResponseModel> {
		const docTypeId = DocumentTypesMap.get(params.custIdentType) as DocumentTypes;
		const apiResponse = await RestAdapter.get<CustomerRequestModel, CustomerResponseApiModel>({
			url: `${CONFIG.PATHS.CUSTOMERS.RESOURCE_URI}${
				CONFIG.PATHS.CUSTOMERS.RESOURCES.GET_CUSTOMER_V2
			}/${docTypeId}/${params.custIdentNum}/${StringUtility.removeSpaces(params.channel)}`,
		});
		return CustomerMapper.map<CustomerResponseModel>(apiResponse);
	}
}

export const customerService = new CustomerService();
