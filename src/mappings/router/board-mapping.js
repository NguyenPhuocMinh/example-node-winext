'use strict';

const BoardService = require('../../services/web-admin-board');

module.exports = [
  {
    pathName: '/boards',
    method: 'GET',
    methodName: 'getMessageBoards',
    serviceName: BoardService,
    input: {
      transform: function (req) {
        return {
          params: req.query
        }
      }
    },
    output: {
      transform: function (response) {
        return {
          headers: {
            'X-Total-Count': response.total,
            'Access-Control-Expose-Headers': 'X-Total-Count'
          },
          body: { result: response.data, total: response.total }
        }
      }
    }
  },
]