import { DocumentTypes } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain/enums/document-types.enum';

export const DocumentTypesMap = new Map<string, string>([
	[DocumentTypes.PS, '1'],
	[DocumentTypes.CC, '2'],
	[DocumentTypes.CE, '3'],
	[DocumentTypes.NJ, '4'],
	[DocumentTypes.TI, '5'],
	[DocumentTypes.RC, '6'],
	[DocumentTypes.NI, '7'],
	['1', DocumentTypes.PS],
	['2', DocumentTypes.CC],
	['3', DocumentTypes.CE],
	['4', DocumentTypes.NJ],
	['5', DocumentTypes.TI],
	['6', DocumentTypes.RC],
	['7', DocumentTypes.NI],
]);
