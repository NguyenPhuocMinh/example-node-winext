'use strict';

const errorCodes = {
  EmailNotFound: {
    message: 'Email not found',
    returnCode: 3001,
    statusCode: 400
  },
  InValidPassword: {
    message: 'Pass word invalid',
    returnCode: 3002,
    statusCode: 400
  },
  RefreshTokenInvalid: {
    message: 'RefreshToken invalid',
    returnCode: 3003,
    statusCode: 400
  }
};

module.exports = errorCodes;