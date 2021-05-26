'use strict';

const permissions = {
  ADMIN: {
    TEST: {
      GET: 'ADMIN_TEST_GET',
    },
    BOARDS: {
      GET: 'ADMIN_BOARD_GET',
      CREATE: 'ADMIN_BOARD_CREATE'
    }
  }
};

module.exports = permissions;