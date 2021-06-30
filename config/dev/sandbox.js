'use strict';

const routerMappings = require('../../src/mappings');
const publicPaths = require('../data/publicPaths');
const protectedPaths = require('../data/protectedPaths');
const errorCodes = require('../data/errorCodes');
const secret = require('../data/secret');

const contextPath = process.env.CONTEXT_PATH || '/rest/api';

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
            info: 4,
          },
          colors: {
            error: 'bold red',
            debug: 'bold blue',
            warn: 'bold yellow',
            data: 'italic magenta',
            info: 'bold green',
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
      winext_repository: {
        mongoose: {
          enable: true,
          host: 'localhost',
          port: '27017',
          name: 'message-board',
        },
        mysql: {
          enable: true,
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'Minhroot123!',
          name: 'message_board',
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
        publicPaths: publicPaths,
        protectedPaths: protectedPaths
      },
      winext_runserver: {
        enable: false,
        contextPath: contextPath,
        port: process.env.PORT || 7979,
        host: process.env.HOST || '0.0.0.0',
        swaggerOptions: {
          definition: {
            openapi: '3.0.0',
            info: {
              title: 'Docs API',
              version: '1.0.0',
            },
            components: {
              securitySchemes: {
                bearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
              security: [
                {
                  bearerAuth: [],
                },
              ],
            },
          },
          apis: ['./src/services/*.js'],
        }
      },
      winext_error_manager: {
        errorCodes: errorCodes
      },
      winext_mapping_store: {
        routerMappings: routerMappings,
      }
    },
  },
}