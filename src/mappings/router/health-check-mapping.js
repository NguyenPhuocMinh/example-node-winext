'use strict';

const HealthCheckService = require('../../services/web-admin-health-check');

module.exports = [
  {
    pathName: '/healths',
    method: 'GET',
    methodName: 'healthCheck',
    serviceName: HealthCheckService
  }
];
