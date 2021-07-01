'use strict';

const ContactService = require('../../services/web-admin-contact');

module.exports = [
  {
    pathName: '/contacts',
    method: 'GET',
    methodName: 'contact',
    serviceName: ContactService
  }
];
