'use strict';

const winext = require('winext');
const sandbox = require('./config/dev/sandbox');

const app = winext.initializer(sandbox,
  [
    'winext-logger',
    'winext-error-manager',
    'winext-repository',
    'winext-authorization',
    'winext-runserver',
    'winext-mapping-store'
  ],
  {
    mongo: 'model-mongo',
    sql: 'model-sql'
  }
);

if (require.main === module) {
  app.server.start();
  const stopped = function () {
    app.server.close();
  };
  process.on('SIGINT', stopped);
  process.on('SIGQUIT', stopped);
  process.on('SIGTERM', stopped);
}
