'use strict';

const winext = require('winext');
const app_logger = require('winext-logger');
const app_repository = require('winext-repository');
const app_runserver = require('winext-runserver');
const app_authorization = require('winext-authorization');
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
  require('./src/modelMongo'),
  require('./src/modelSQL')
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
