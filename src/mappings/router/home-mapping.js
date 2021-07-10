'use strict';

const HomeService = require('../../services/web-admin-home');

module.exports = [
  {
    pathName: '/home',
    method: 'GET',
    methodName: 'home',
    serviceName: HomeService
  }
];
