import { DocumentTypes } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain/enums';

export interface CustomerRequestModel {
	custIdentNum: string;
	custIdentType: DocumentTypes;
	channel: string;
}
