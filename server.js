'use strict';

const winext = require('winext');
const app_logger = require('app-logger');
const app_repository = require('app-repository');
const app_runserver = require('app-runserver');
const app_authorization = require('app-authorization');
const sandbox = require('./config/dev/sandbox');

const app = winext.initializer(sandbox,
  [
    {
      name: 'app-logger',
      app_logger
    },
    {
      name: 'app-repository',
      app_repository
    },
    {
      name: 'app-authorization',
      app_authorization
    },
    {
      name: 'app-runserver',
      app_runserver
    },
  ],
  require('./src/model')
)

if (require.main === module) {
  app.server.start();
  const stopped = function () {
    app.server.close();
  };
  process.on('SIGINT', stopped);
  process.on('SIGQUIT', stopped);
  process.on('SIGTERM', stopped);
}
