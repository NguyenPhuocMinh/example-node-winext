'use strict';

const permissions = require('./permissions');

module.exports = [
  /**
   *  BOARDS
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/boards',
    permission: permissions.ADMIN.BOARDS.GET
  }
]