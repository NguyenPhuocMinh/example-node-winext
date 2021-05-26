'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const dataStore = require('app-repository').dataStore;
const { isEmpty } = lodash;

function BoardService() {

  // get all
  this.getMessageBoards = async function (args, opts = {}) {
    const { loggerFactory, requestId } = opts;

    try {
      loggerFactory.debug(`function getMessageBoards begin`, {
        requestId: `${requestId}`
      });

      const params = args.params;
      const skip = parseInt(params._start) || 0;
      let limit = parseInt(params._end) || 1000;
      limit = limit - skip;
      console.log("🚀 ~ file: web-admin-board.js ~ line 53 ~ skip", skip)
      console.log("🚀 ~ file: web-admin-board.js ~ line 56 ~ limit", limit)

      const boards = await dataStore.find({
        type: 'BoardModel',
        filter: { deleted: false },
        projection: {
          __v: 0
        },
        options: {
          sort: { registerDate: -1 },
          skip: skip,
          limit: limit
        }
      });

      const data = await convertDataResponse(boards)

      const total = await dataStore.count({
        type: 'BoardModel',
        filter: { deleted: false }
      })

      loggerFactory.debug(`function getMessageBoards end`, {
        requestId: `${requestId}`
      });

      return { data: data, total: total };

    } catch (err) {
      loggerFactory.error(`function getMessageBoards has error : ${err}`, {
        requestId: `${requestId}`
      })
      return Promise.reject(err);
    }
  };
};

async function convertDataResponse(boards) {
  return Promise.map(boards, (board, index) => {
    return convertDataBoard(board, index);
  }, { concurrency: 5 });
};

function convertDataBoard(board, index) {
  const response = {};
  if (!isEmpty(board)) {
    board = board.toJSON();
    response.id = board._id;
    response.registerDate = board.registerDate;
    response.title = board.title;
    response.name = board.name;
    response.description = board.description;
    response.index = index;

    delete board._id;

    return response;
  } else {
    return Promise.resolve();
  }
};

exports = module.exports = new BoardService();
exports.register = BoardService;