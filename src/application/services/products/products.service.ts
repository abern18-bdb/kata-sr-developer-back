import { EnumPaymentSupportsMethods } from '../../../domain/enums/structure-description.enum';
import CONFIG from '../../../config';
import { ProductsResponseModel } from '../../../domain/products/products-response.model';
import { ProductsMapper } from '../../mappers/products/products.mapper';
import { ProductsRequestModel } from '../../../domain/products/products-request.model';
import { SoapAdapter } from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/infrastructure';
import {
	GenericCommandService,
	GenericRequestModel,
	HeaderModel,
	IStructureProperties,
} from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/domain';
import { BdbHeaders } from '@npm-bbta/bbog-dig-evo-express-common-lib';

class ProductsService
	extends SoapAdapter
	implements
		GenericCommandService<GenericRequestModel<ProductsRequestModel>, ProductsResponseModel>
{
	async command(
		request: GenericRequestModel<ProductsRequestModel>
	): Promise<ProductsResponseModel> {
		const apiResponse = await this.invoke(request.headers, request.body);
		return ProductsMapper.map<ProductsResponseModel>(apiResponse);
	}

	public generateXml(request: HeaderModel, bodyData: any): string {
		return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:ser="urn://bancodebogota.com/creditcard/product/service/"
        xmlns:even="urn://bancodebogota.com/creditcard/product/event/"
        xmlns:v1="urn://bancodebogota.com/ifx/base/v1/"
        xmlns:v11="urn://bancodebogota.com/creditcard/product/v1/">
        <soapenv:Header/>
        <soapenv:Body>
           <ser:getCCAcctDetailPaymentsRequest>
              <even:CCAcctDetailPaymentsInqRq>
                <v1:RqUID>${request[BdbHeaders.XRquid]}</v1:RqUID>
                <v1:CustId>
                    <v1:CustLoginId>${request[BdbHeaders.XCustidenttype]}</v1:CustLoginId>
                </v1:CustId>
                <v1:NetworkTrnInfo>
                    <v1:NetworkOwner>${request[BdbHeaders.XChannel]}</v1:NetworkOwner>
                    <v1:CustIdent>${request[BdbHeaders.XCustidenttype]}</v1:CustIdent>
                </v1:NetworkTrnInfo>
                <v11:Account>
                    <v1:ProductNum>${bodyData.productNum}</v1:ProductNum>
                </v11:Account>
              </even:CCAcctDetailPaymentsInqRq>
           </ser:getCCAcctDetailPaymentsRequest>
        </soapenv:Body>
      </soapenv:Envelope>`;
	}

	public getStructureProperties(): IStructureProperties {
		return EnumPaymentSupportsMethods.PRODUCTS_SERVICE_CONFIG;
	}

	public getUrl(): string {
		return `${CONFIG.PATHS.PRODUCTS.RESOURCE_URI}${CONFIG.PATHS.PRODUCTS.RESOURCES.GET_PRODUCTS_V2}`;
	}
}

export const productsService = new ProductsService();
