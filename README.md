# Testing Nest App

## Description

This app was created just for testing Nest framework. </br>


**Technologies:** NodeJS, PostgreSQL, NestJS, Typescript </br>
**Libraries:** sequelize, swagger </br>

## Installation

1. `npm install`
2a. Create `.development.env` file by `cp .development.env.example .development.env` command.
2b. Create `.production.env` file with the same variables as in dev if you want to run the app in production mode.
3. Install PostgreSQL if you didn't do that yet.
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```