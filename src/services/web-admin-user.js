'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const jwt = require('winext-authorization').jwt;
const bcrypt = require('bcryptjs');
const dataSecret = require('../../config/data/secret');
const { isEmpty, get } = lodash;
function UserService(params = {}) {
  const { dataStore, dataSequelize, errorManager } = params;

  // register user
  this.registerUser = async function (args, opts) {
    const { loggerFactory, requestId } = opts;

    try {
      loggerFactory.debug(`function registerUser begin`, {
        requestId: `${requestId}`,
        args: args
      });

      // Hash Password
      let password = '';
      if (isEmpty(args.password)) {
        password = '123';
      } else {
        password = args.password
      }
      const salt = await bcrypt.genSalt(10);
      args.password = await bcrypt.hash(password, salt);

      await dataStore.create({
        type: 'UserModel',
        data: args
      });

      return { message: 'Register user successfully!' };

    } catch (err) {
      loggerFactory.error(`function registerUsers has error : ${err}`, { requestId: `${requestId}` });
      return Promise.reject(err);
    }
  };

  /**
   * @swagger
   * /rest/api/user/login:
   *   post:
   *      summary: Login User
   *      description: Welcome to login user
   *      requestBody: 
   *          required: true
   *          content:
   *            application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                      email:
   *                        type: string
   *                        default: admin@gmail.com
   *                      password:
   *                        type: string
   *                        default: 123
   *      responses:
   *        default:
   *         description: Login success
   */

  /**
   * Login user
   * @param {*} args 
   * @param {*} opts 
   */
  this.loginUser = async function (args, opts) {
    const { loggerFactory, requestId } = opts;

    try {
      loggerFactory.debug('function loginUser', {
        requestId: `${requestId}`,
        args: args
      });

      const testSequelize = await dataSequelize.find({
        type: 'BoardModel',
      })

      /**
       * get user login
       */
      const userLogin = await dataStore.findOne({
        type: 'UserModel',
        filter: {
          email: args.email
        }
      })
      if (!userLogin) {
        throw errorManager.errorBuilder('EmailNotFound');
      }
      /**
       * compare password
       */
      const validPass = await bcrypt.compare(args.password, userLogin.password);
      if (!validPass) {
        throw errorManager.errorBuilder('InValidPassword');
      }
      /**
       * create token
       */
      const token = jwt.sign({ userLogin }, dataSecret.tokenSecret, {
        expiresIn: dataSecret.tokenLife,
      });
      /**
       * create refresh token
       */
      const refreshToken = jwt.sign({ userLogin }, dataSecret.refreshTokenSecret, {
        expiresIn: dataSecret.refreshTokenLife
      })

      loggerFactory.debug('function loginUser end', {
        requestId: `${requestId}`,
        args: {
          token,
          refreshToken
        }
      });
      return {
        token: token,
        refreshToken: refreshToken,
        expiresIn: dataSecret.tokenLife,
        id: userLogin.id,
        name: userLogin.firstName + " " + userLogin.lastName,
        permissions: userLogin.permissions,
      }
    } catch (err) {
      loggerFactory.error(`function loginUser has error`, {
        requestId: `${requestId}`,
        args: { err }
      });
      return Promise.reject(err);
    }
  };
  // refresh token
  this.refreshTokenHandler = async function (args, opts) {
    const { loggerFactory, requestId } = opts;
    /**
     * get refreshToken from client
     */
    const { refreshToken } = args;

    try {

      loggerFactory.debug(`function refreshTokenHandler start with args`, {
        requestId: `${requestId}`,
        args: { refreshToken }
      });

      if (isEmpty(refreshToken)) {
        throw errorManager.errorBuilder('RefreshTokenInvalid');
      }

      let userLogin;
      let newToken;
      let newRefreshToken;

      await jwt.verify(refreshToken, dataSecret.refreshTokenSecret, (err, decoded) => {
        if (!isEmpty(decoded)) {
          userLogin = get(decoded, 'userLogin');
          /**
           * post new token
           */
          newToken = jwt.sign({ userLogin }, dataSecret.tokenSecret, {
            expiresIn: dataSecret.tokenLife,
          })
          /**
           * post new refresh token
           */
          newRefreshToken = jwt.sign({ userLogin }, dataSecret.refreshTokenSecret, {
            expiresIn: dataSecret.refreshTokenLife
          })
        } else {
          throw new Error(err.message);
        }
      });

      loggerFactory.debug(`function refreshTokenHandler end with args`, {
        requestId: `${requestId}`,
        args: {
          newToken,
          refreshToken
        }
      });

      return {
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: dataSecret.tokenLife,
        id: userLogin.id,
        name: userLogin.firstName + " " + userLogin.lastName,
        permissions: userLogin.permissions,
      }

    } catch (err) {
      loggerFactory.error(`function refreshToken has error`, {
        requestId: `${requestId}`,
        args: { err }
      });
      return Promise.reject(err);
    }
  };
};

UserService.reference = {
  dataStore: 'app-repository/dataStore',
  dataSequelize: 'app-repository/dataSequelize',
  errorManager: 'app-error-manager/errorManager'
}

exports = module.exports = new UserService();
exports.register = UserService;