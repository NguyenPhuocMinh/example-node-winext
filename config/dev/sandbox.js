'use strict';

const winext = require('winext');
const dotenv = winext.require('dotenv');
const ip = winext.require('ip');
const routerMappings = require('../../src/mappings');
const enablePaths = require('../data/enablePaths');
const publicPaths = require('../data/publicPaths');
const protectedPaths = require('../data/protectedPaths');
const errorCodes = require('../data/errorCodes');
const secret = require('../data/secret');
const address = ip.address();
dotenv.config();

const contextPath = process.env.CONTEXT_PATH;

module.exports = {
  application: {
    dependencies: {
      winext_logger: {
        winston: {
          levels: {
            error: 0,
            debug: 1,
            warn: 2,
            data: 3,
            info: 4
          },
          colors: {
            error: 'bold red',
            debug: 'bold blue',
            warn: 'bold yellow',
            data: 'italic magenta',
            info: 'bold green'
          }
        },
        log4js: {
          appenders: {
            out: { type: 'stdout' }
          },
          categories: {
            default: {
              appenders: ['out'],
              level: 'debug'
            }
          }
        }
      },
      winext_api_gateway: {
        kong: {
          enable: true,
          port: process.env.KONG_ADMIN_PORT || 8001,
          service: {
            name: process.env.SERVICE_NAME,
            url: `http://${address}:${process.env.SERVER_PORT}/rest/api/`
          },
          route: {
            name: process.env.SERVICE_NAME,
            service: {
              name: process.env.SERVICE_NAME
            },
            hosts: [address],
            paths: ['/user-service'],
            methods: ['GET', 'POST']
          },
          consumer: {
            username: 'Minh'
          },
          plugin: {
            name: 'key-auth',
            config: {
              key_names: ['x-gateway-key'],
              key_in_header: true,
              key_in_body: false,
              key_in_query: false
            },
            route: {
              name: process.env.SERVICE_NAME
            }
          },
        }
      },
      winext_service_registry: {
        consul: {
          enable: true,
          init: {
            host: process.env.CONSUL_HOST || address,
            port: process.env.CONSUL_PORT || 8500, // default port for consul
            promisify: true
          },
          register: {
            id: process.env.SERVICE_ID,
            name: process.env.SERVICE_NAME,
            port: process.env.PORT || 8081,
            check: {
              http: `http://${process.env.CONSUL_HOST || address}:${process.env.SERVER_PORT}${contextPath}/healths`,
              interval: '60s',
              timeout: '20s'
            }
          }
        }
      },
      winext_repository: {
        mongoose: {
          enable: true,
          host: process.env.MONGO_HOST,
          port: process.env.MONGO_PORT,
          name: process.env.MONGO_DATABASE
        },
        mysql: {
          enable: true,
          host: process.env.SQL_HOST,
          port: process.env.SQL_PORT,
          user: process.env.SQL_USER,
          password: process.env.SQL_PASSWORD,
          name: process.env.SQL_DATABASE,
          sequelizeOptions: {
            dialect: 'mysql',
            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
            }
          }
        }
      },
      winext_authorization: {
        enable: true,
        secretKey: secret.tokenSecret,
        contextPath: contextPath,
        enablePaths: enablePaths,
        publicPaths: publicPaths,
        protectedPaths: protectedPaths
      },
      winext_runserver: {
        enable: false,
        contextPath: contextPath,
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST,
        swaggerOptions: {
          definition: {
            openapi: '3.0.0',
            info: {
              title: 'Docs API',
              version: '1.0.0'
            },
            components: {
              securitySchemes: {
                bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT'
                }
              },
              security: [
                {
                  bearerAuth: []
                }
              ]
            }
          },
          apis: ['./src/services/*.js']
        }
      },
      winext_error_manager: {
        errorCodes: errorCodes
      },
      winext_mapping_store: {
        routerMappings: routerMappings
      }
    }
  }
};
