# Assumptions

## Tools I Have Used

### [Sequelize](https://sequelize.org/master/index.html) - ORM

For Database pooling connection and easier data access to object type return from query.

### [Lodash](https://lodash.com/) - JS utils

For easier data checking and data formating.

### [Winston](https://www.npmjs.com/package/winston) - Logger

For easier to debug.

## Architecture

I try to implement clean architecture for seperation of concern so when ever we want to change our DB to other persistance type we can just edit in the repositories/.

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
