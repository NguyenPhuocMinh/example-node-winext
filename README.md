## Building api node js Using express custom

#### Step 1: install
```sh
  - cd example-node-winext and npm install
```

#### Step 2: add .env file
```bash
#Server
HOST=0.0.0.0
PORT=9999
CONTEXT_PATH=/rest/api

#Mongoose
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=DATABASE_NAME

#Sql
SQL_HOST=localhost
SQL_PORT=3306
SQL_USER=USER
SQL_PASSWORD=PASSWORD
SQL_DATABASE=DATABASE_NAME
```
#### Step 3: run server
```bash
  - npm start or node server.js
```

### Docs Api Using Swagger
  - http://localhost:9999/api-docs

### Connect to Api Gateway with Kong and Service registry with Consul
  - [Api Gateway](https://github.com/NguyenPhuocMinh/microservice-node/tree/master/api-gateway)
  - [Service registry](https://github.com/NguyenPhuocMinh/microservice-node/tree/master/service-registry)