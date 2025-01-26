# physical-training-management-platform

An API to manage a platform dedicated to gyms, gym owners and end users.

## Run it

### You will need 3 .env files

- api/.env
- mongo/.env
- ./env

### To run it

```sh
docker compose up --build
```

## What is done

### CRUD

- Address
- Description (of training room)
- Exercise
- TrainingRoom
- User

### MongoDB

- Mongo fixtures
- Mongoose:
  - mongoose schemas
  - mongoose services

### Docker

- docker-compose
- dockerfile
- entrypoint

### Models

- interfaces
- enum

### Middlewares

- JWT
- Bcrypt
- errorHandler
- validators (of User Roles)

### Configurations

- Cors
- Database
- Helmet
- Logger
- Swagger
