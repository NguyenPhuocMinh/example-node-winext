'use strict';

const HomeService = require('../../services/web-admin-home');

module.exports = [
  {
    pathName: '/',
    method: 'GET',
    methodName: 'home',
    serviceName: HomeService
  }
];
