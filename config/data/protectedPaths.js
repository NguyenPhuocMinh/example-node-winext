'use strict';

const permissions = require('./permissions');

module.exports = [
  /**
   *  TEST
   */
  {
    method: 'GET',
    pathName: '/tests',
    permission: permissions.ADMIN.TEST.GET
  },
  /**
   *  BOARDS
   */
  {
    method: 'GET',
    pathName: '/boards',
    permission: permissions.ADMIN.BOARDS.GET
  },
  {
    method: 'POST',
    pathName: '/boards',
    permission: permissions.ADMIN.BOARDS.CREATE
  }
]