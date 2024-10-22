import { EventTypes } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain';
import { ControllerModel } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain/generics/controller-model';

export const GET_CUSTOMER_CONTROLLER_MODEL: ControllerModel = {
	events: [EventTypes.technical],
	flowName: 'INQUIRY_CUSTOMER',
	genericResponse: false,
};
export const GET_PRODUCT_CONTROLLER_MODEL: ControllerModel = {
	events: [EventTypes.technical],
	flowName: 'INQUIRY_PRODUCTS',
	genericResponse: false,
};

