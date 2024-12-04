# Documentation for Technologies Used in the Backend Project

This document provides an overview of the technologies and dependencies used in this project, along with a brief explanation of their purpose.

---

## Postman Documentation (end points)

https://web.postman.co/api/:apiId/documentation/32877376-39257cef-2e9b-4b80-bed9-5d53f30ca575/publish?workspaceId=25b532b2-3aba-4afb-8987-97cf21f4f930&requestId=

## Core Dependencies

### [NestJS](https://nestjs.com/)

A progressive Node.js framework for building efficient and scalable server-side applications. Key features:

- Modular architecture.
- Dependency injection.
- Built-in support for middleware and decorators.

### [Mongoose](https://mongoosejs.com/)

A MongoDB object modeling library for Node.js that simplifies schema definition and database operations.

### [@nestjs/mongoose](https://docs.nestjs.com/techniques/mongodb)

NestJS integration for Mongoose to handle MongoDB operations within NestJS modules.

### [RxJS](https://rxjs.dev/)

A library for reactive programming using observables, used extensively within NestJS for handling asynchronous operations.

### [Class-validator](https://github.com/typestack/class-validator)

Provides decorators for validating objects in NestJS, ensuring input data integrity.

### [@nestjs/jwt](https://docs.nestjs.com/security/authentication#jwt-token)

A module to implement JWT-based authentication in NestJS applications.

### [Passport](http://www.passportjs.org/)

Middleware for authentication in Node.js, with strategies such as JWT used for secure login.

### [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

A JavaScript library for hashing passwords securely.

### [dotenv](https://github.com/motdotla/dotenv)

Loads environment variables from a `.env` file, simplifying configuration management.

### [@aws-sdk/client-s3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html)

AWS SDK module for interacting with Amazon S3, used for file storage and uploads.

---

## Development Dependencies

### [TypeScript](https://www.typescriptlang.org/)

A strongly-typed superset of JavaScript used to develop and maintain scalable applications.

### [Jest](https://jestjs.io/)

A testing framework for JavaScript, used for unit testing and test coverage.

### [ts-jest](https://kulshekhar.github.io/ts-jest/)

A TypeScript preprocessor for Jest, enabling TypeScript testing.

### [ESLint](https://eslint.org/)

A static code analysis tool to ensure code quality and consistency.

### [Prettier](https://prettier.io/)

An opinionated code formatter for maintaining consistent code styling.

### [Supertest](https://github.com/visionmedia/supertest)

A testing library for HTTP assertions, often used for end-to-end tests.

### [ts-node](https://github.com/TypeStrong/ts-node)

Enables running TypeScript directly in a Node.js environment.

---

## Scripts

The `package.json` includes several scripts for common tasks:

| Script      | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `start`     | Starts the application in production mode.                      |
| `start:dev` | Starts the application in development mode with file watching.  |
| `build`     | Compiles TypeScript code into JavaScript.                       |
| `test`      | Runs unit tests with Jest.                                      |
| `test:e2e`  | Executes end-to-end tests.                                      |
| `lint`      | Lints the codebase with ESLint and attempts auto-fixing issues. |
| `format`    | Formats the codebase with Prettier.                             |

---

## Testing Configuration

The project uses Jest for unit and end-to-end testing. Key configurations include:

- Test files are identified by the `.spec.ts` suffix.
- Coverage reports are generated in the `coverage` directory.

---

## Environment Variables

The application uses environment variables to manage sensitive data. These should be stored in a `.env` file. Example variables:

```env
DATABASE_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
AWS_ACCESS_KEY_ID=<your_aws_access_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
AWS_REGION=<your_aws_region>
S3_BUCKET_NAME=<your_s3_bucket_name>
```
