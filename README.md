# Loket API

Loket API for online Loket reservation and implementing Clean Architecture for seperation of concern.

## Getting Started

### Prerequisites

Things you need to have and installed

```
MySQL v5.7
Node.js v12.4.0 or latest
NPM	v6.9.0 or latest
```

### Installing

Setup database

![alt text](https://github.com/kadekchrisna/loket/blob/master/assets/loket.jpg?raw=true)

```
create scheme with name loket

import script loket.sql
```

Copy Environtment Variables

```
cp local.env .env
```

Installing dependencies

```
go to project directory, run

npm i
```

## Running the server

How to run the server

```
npm start
```

### Project anatomy

```
src
 └ application                      → Application services layer
       └ use_cases                  → Application business rules
  └ domain                          → Enterprise core business layer such as domain model objects and repository interfaces
  └ infrastructure                  → Frameworks, drivers and tools such as Database, the Web Framework, mailing/logging/glue code etc.
       └ config                     → Application configuration files, modules and services
       └ orm                        → Database ORMs middleware (Sequelize for SQLite3 or PostgreSQL, Mongoose for MongoDB)
          └ sequelize               → Sequelize client and models
       └ repositories               → Implementation of domain repository interfaces
   └ interfaces                     → Adapters and formatters for use cases and entities to external agency such as Database or the Web
       └ controllers                → route handlers
       └ routes                     → route definitions
 └ node_modules (generated)         → NPM dependencies
 └ index.js                         → Main application entry point
```

## Postman Collection

Here's lists [API Collection](https://www.getpostman.com/collections/c615eaf10fe47d9f2235).

Env for Loket API Collection

```
BASE localhost:3000
```

| File Name                      | Endpoint           | Relative Path           | Method | Description                                                                     |
| ------------------------------ | ------------------ | ----------------------- | ------ | ------------------------------------------------------------------------------- |
| Event/Create Location          | Create Location    | _/location/create_      | POST   | Endpoint to create new location                                                 |
| Event/Create Event             | Create Event       | _/event/create_         | POST   | Endpoint to create new event                                                    |
| Ticket/Create Ticket           | Create Ticket      | _/event/ticket/create_  | POST   | Endpoint to create new ticket type on one specific event                        |
| Event/Get Event                | Get Event          | _/event/get_info_       | GET    | Endpoint to retrieve event information, including location data and ticket data |
| Transaction/Purchase Ticket    | Purchase Ticket    | _/transaction/purchase_ | POST   | Endpoint to make a new purchase, customer data is sent via this API             |
| Transaction/Transcation Detail | Transcation Detail | _/transaction/get_info_ | GET    | Endpoint to retrieve transaction created using endpoint _Purchase Ticket_       |

## Built With

- [Express](https://expressjs.com/) - Node.js web framework
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Sequelize](https://sequelize.org/master/index.html) - ORM
- [Lodash](https://lodash.com/) - JS utils
- [Winston](https://www.npmjs.com/package/winston) - Logger
