import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock, { Interceptor } from 'nock';
import sinon from 'sinon';
import { constants } from 'http2';
import app from '../../../app';
import CONFIG from '../../../config';
import { Done } from 'mocha';
import { DocumentTypesMap } from '../../../domain/enums/document-types.enum';
import {
	FileUtility,
	StringUtility,
} from '@npm-bbta/bbog-dig-evo-express-common-lib/lib/application';

chai.use(chaiHttp);
chai.should();

describe('CustomerController', () => {
	const server = sinon.createSandbox();
	const responseFile = FileUtility.get('/mocks/customers/response.json');
	const baseMocks = FileUtility.get('/mocks/base/base-mocks.json');
	const requestHeaders = baseMocks.headers.request;
	const responseApiHeaders = baseMocks.headers.responseApiHeaders;

	const customerRequest = () => {
		return chai
			.request(app)
			.get(
				`${CONFIG.CONTEXT}${CONFIG.PATHS.CUSTOMERS.PATH}${CONFIG.PATHS.CUSTOMERS.OPERATIONS.CUSTOMER}`
			)
			.set(requestHeaders);
	};

	const nockCustomerApiInterceptor: Interceptor = nock(CONFIG.PATHS.CUSTOMERS.RESOURCE_URI).get(
		`${CONFIG.PATHS.CUSTOMERS.RESOURCES.GET_CUSTOMER_V2}/${DocumentTypesMap.get(
			requestHeaders['X-CustIdentType']
		)}/${requestHeaders['X-CustIdentNum']}/${StringUtility.removeSpaces(
			requestHeaders['X-Channel']
		)}`
	);

	beforeEach(() => {
		nock.cleanAll();
	});

	afterEach(() => {
		server.restore();
		sinon.restore();
	});

	after(() => {
		sinon.reset();
	});

	it('Success customer get data', (done: Done) => {
		nockCustomerApiInterceptor.reply(
			constants.HTTP_STATUS_OK,
			responseFile.backendResponses.success,
			responseApiHeaders
		);

		customerRequest().end((_, res) => {
			console.log('customerRequest', res.body);
			res.should.have.status(constants.HTTP_STATUS_OK);
			expect(res.body).to.have.property('status').to.be.eq(constants.HTTP_STATUS_OK);
			expect(res.body).to.have.property('message').to.have.eq('OK');
			expect(res.body.data).to.have.property('isActive').to.have.eq(true);
			done();
		});
	});

	it('Business failed customer get data', (done: Done) => {
		nockCustomerApiInterceptor.reply(
			constants.HTTP_STATUS_CONFLICT,
			responseFile.backendResponses.conflict,
			responseApiHeaders
		);

		customerRequest().end((_, res) => {
			console.log('customerRequest', res.body);
			res.should.have.status(constants.HTTP_STATUS_CONFLICT);
			expect(res.body.message).to.be.contain('Error, a Business exception occurred');
			done();
		});
	});

	it('Application technical error on customer get data', (done: Done) => {
		nockCustomerApiInterceptor.reply(
			constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
			responseFile.backendResponses.internal,
			responseApiHeaders
		);

		customerRequest().end((_, res) => {
			console.log('customerRequest', res.body);
			res.should.have.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
			expect(res.body.message).to.be.contain('Error, an application Exception with Error');
			done();
		});
	});
});
