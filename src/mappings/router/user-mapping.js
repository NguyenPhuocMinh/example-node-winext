'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const UserService = require('../../services/web-admin-user');
const { get } = lodash;

module.exports = [
  // user register
  {
    pathName: '/user/registers',
    method: 'POST',
    methodName: 'registerUser',
    serviceName: UserService,
    input: {
      transform: function (req) {
        return {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          gender: req.body.gender,
          permissions: req.body.permissions
        };
      }
    },
    output: {
      transform: function (response) {
        return {
          body: response
        };
      }
    }
  },
  // user login
  {
    pathName: '/user/login',
    method: 'POST',
    methodName: 'loginUser',
    serviceName: UserService,
    input: {
      transform: function (req, opts) {
        return {
          email: req.body.email,
          password: req.body.password
        };
      }
    },
    output: {
      transform: function (response) {
        return {
          headers: {
            'X-AccessToken': get(response, 'token')
          },
          body: response
        };
      }
    }
  },
  // refreshTokens
  {
    pathName: '/user/refreshTokens',
    method: 'POST',
    methodName: 'refreshTokenHandler',
    serviceName: UserService,
    input: {
      transform: function (req) {
        return {
          refreshToken: req.body.refreshToken
        };
      }
    },
    output: {
      transform: function (response) {
        return {
          headers: {
            'X-AccessToken': get(response, 'token')
          },
          body: response
        };
      }
    }
  }
];
