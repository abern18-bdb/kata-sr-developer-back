const VERSIONS = {
	V1: '/V1',
};

export default {
	LOGGER_LEVEL: process.env.LOGGER_LEVEL ?? 'info',
	PORT: process.env.PORT ?? '8001',
	CONTEXT: process.env.CONTEXT ?? '/api',
	PATHS: {
		TASKS: {
			PATH: `${VERSIONS.V1}/tasks`,
			RESOURCES: {
				CREATE_TASK: '/create',
				LIST_TASKS: '/list',
			},
		},
	},
	RESOURCE: './static',
	OAS: {
		FILE: './OAS.json',
		PATH: '/api-docs',
	}
};
