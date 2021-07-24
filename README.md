## Building api node js Using express custom

## Structure
```
.
├── README.md
├── config
│   ├── data
│   │   ├── enablePaths.js
│   │   ├── errorCodes.js
│   │   ├── permissions.js
│   │   ├── protectedPaths.js
│   │   ├── publicPaths.js
│   │   └── secret.js
│   └── dev
│       └── sandbox.js
├── package.json
├── server.js
├── src
│   ├── mappings
│   │   ├── index.js
│   │   └── router
│   │       ├── board-mapping.js
│   │       ├── contact-mapping.js
│   │       ├── health-check-mapping.js
│   │       ├── home-mapping.js
│   │       └── user-mapping.js
│   └── services
│       ├── web-admin-board.js
│       ├── web-admin-contact.js
│       ├── web-admin-health-check.js
│       ├── web-admin-home.js
│       └── web-admin-user.js
```

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


#CONSUL_INIT
CONSUL_HOST=IP adress
CONSUL_PORT=8500

#CONSUL_REGISTER
SERVICE_ID=user-service
SERVICE_NAME=user-service

#KONG ADMIN
KONG_PORT=8001
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
