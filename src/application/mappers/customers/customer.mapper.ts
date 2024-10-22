import { DocumentTypesMap } from '../../../domain/enums/document-types.enum';
import { CustomerResponseApiModel } from '../../../domain/customers/customer-response-api.model';
import { DocumentTypes, HeaderModel } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain';
import { Log } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/infrastructure';
import { BdbHeaders } from '@npm-bbta/bbog-dig-evo-express-common-lib';

export class CustomerMapper {
	@Log()
	public static map<O>(input: CustomerResponseApiModel): O {
		return {
			identification: input.personalId,
			documentType: DocumentTypesMap.get(input.customerIdTypeId.toString()) as DocumentTypes,
			firstName: input.firstName,
			lastName: input.lastName,
			isActive: input.active,
			email: input.eMail,
			customerId: input.id,
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
