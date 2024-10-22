import { GenericModel } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain';

export interface CustomerResponseApiModel extends GenericModel {
	active: boolean;
	customProperties?: string;
	customerIdTypeId: string;
	customerIdTypeName: string;
	customerLevelId: number;
	customerLevelName: string;
	description?: string;
	dob: string;
	eMail: string;
	extRef: string;
	firstName: string;
	isCustomerGroup: boolean;
	isMemberOfGroups: boolean;
	languageCode: string;
	lastName: string;
	name: string;
	notes: string;
	partOfQapp: boolean;
	personalId: string;
	pictureAttachmentId: number;
	sex: string;
	telNumber1: string;
	telNumber2: string;
}
