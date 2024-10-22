# bbog-dig-dt-nodejs-mngr-template

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bbog-dig-dt-nodejs-mngr-template&metric=alert_status&token=288fe1116879fa24307060b57b7240d67dddf379)](https://sonarcloud.io/summary/new_code?id=bbog-dig-dt-nodejs-mngr-template)

---

## Considerations

Include initial cosiderations here

1. Install dependencies

```
npm ci
```

2. run project on local environment with `Nodemon` dependency

```
npm run dev
```

With this two steps, you could run the project and try to prove it on:

```
http://localhost:8001/my-context
```

## Unit tests sonar and lints

- This projects gives a script to run the specific tests throw package json file, yo can run:

```
npm run coverage
```

- To run Sonar locally you can exec the command

```
npm run sonar:local
```

Take in consideration that you must be configured previously Sonar running on your local machine.

- If you need run eslint or prettier scripts you can exec:

```
npm run fix:all
```

With this command you are running lints and prettier commands

## Project structure

This project works with the next structure

- Application: Business logic
  - mappers: You can create here your own application models with external API models or Entities
  - services: Business logic was related here, take in consideration that each operation usually needs a specific service
  - utilities: Static methods that not need without dependencies
- Domain: Models and entities
  - folder by business domain: if you have, customers, offices, pays, generics or other domain, each one needs a specific folder
  - enums: You can create all enums that your models need here
  - errors: Error models can be registered too
  - generics: Generic response models can be created here
- Infrastructure: Framework layer
  - controllers: Classes to call services operations, nothing more
  - routers: Routers to call controllers on Express JS with specific HTTP methods in some cases

IMPORTANT:
- The template makes use of the common library whose objective is to provide the main functional needs of the MS to be developed. for more
information see readme: https://github.com/bancodebogota/bbog-dig-evo-express-common-lib
- Remember to set the following environment variables in your project
  - API_EVENT_HOST: elastic search api url
  - API_EVENT_PATH: complementary path for elastic search report
  - EVENT_INDEX: index used in slastic
  - PARTIAL_MASK_FIELDS: list of attributes to partially obfuscate requests and responses printed in the logs. for example: x-api-key,api-key,custIdentNum
  - FULL_MASK_FIELDS: full masking of request and response attributes printed in the logs. for example: password,secret,binData


## Other aspects

- Implements husky to ensure test and lints are Ok
- Express like Node Js framework technology
- We use Mocha, Chai, Sinon and Nock on unit tests
- Deploys with GitHub Actions and environment vars with `./pipelines/{env}-env.json` files
