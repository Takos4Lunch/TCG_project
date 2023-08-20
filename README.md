# TCG_project
### Trading Card Game backend API

A backend API that manages users, decks and cards, based on a traditional trading card game structure

### Proyect Structure

* config: Contains values extracted from environment variables
* db: Contains the declaration of the database models
* libs: Contains basic library implementations for ease of use
* middlewares: Contains tools implemented in the endpoints of the application for simple tasks, such as authentication or schema verification
* routes: Declaration of the routes used by the app, and their behaviour
* schemas: Declaration of the schemas used to validate user input
* services: Implementation and abstraction layer of the different methods used to interact with the database, provided by the ORM
* utils: various utilities used for user authentication
  
### Design patterns and libraries implemented

* Clean Architecture
* Express
* Json Web Token
* Sequelize
* Passport 
* Boom
* Joi
