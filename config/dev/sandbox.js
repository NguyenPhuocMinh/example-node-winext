'use strict';

const routerMappings = require('../../src/mappings');
const publicPaths = require('../data/publicPaths');
const protectedPaths = require('../data/protectedPaths');
const errorCodes = require('../data/errorCodes');
const secret = require('../data/secret');

const contextPath = '/rest/api';

module.exports = {
  application: {
    dependencies: {
      app_logger: {
        winston: {
          levels: {
            error: 0,
            debug: 1,
            warn: 2,
            data: 3,
            info: 4,
            underline: 5
          },
          colors: {
            error: 'bold red',
            debug: 'bold blue',
            warn: 'bold yellow',
            data: 'italic magenta',
            info: 'bold green',
          }
        },
        log4js: {}
      },
      app_repository: {
        mongoose: {
          enable: true,
          host: 'localhost',
          port: '27017',
          name: 'message-board',
        },
      },
      app_authorization: {
        enable: true,
        secretKey: secret.tokenSecret,
        contextPath: contextPath,
        publicPaths: publicPaths,
        protectedPaths: protectedPaths
      },
      app_runserver: {
        enable: false,
        contextPath: contextPath,
        port: 7979,
        host: '0.0.0.0',
      },
    },
    routerMappings: routerMappings,
    errorCodes: errorCodes
  },
}