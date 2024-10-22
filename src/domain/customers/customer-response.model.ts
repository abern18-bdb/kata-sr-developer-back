import { DocumentTypes } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain/enums';

export interface CustomerResponseModel {
	documentType: DocumentTypes;
	email: string;
	id: number;
	identification: string;
	firstName: string;
	isActive: boolean;
	lastName: string;
}
