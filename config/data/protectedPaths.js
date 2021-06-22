'use strict';

const permissions = require('./permissions');

module.exports = [
  /**
   *  TEST
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/tests',
    permission: permissions.ADMIN.TEST.GET
  },
  /**
   *  BOARDS
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/boards',
    permission: permissions.ADMIN.BOARDS.GET
  },
  {
    enable: true,
    method: 'POST',
    pathName: '/boards',
    permission: permissions.ADMIN.BOARDS.CREATE
  }
]