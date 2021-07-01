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

  /**
   * @swagger
   * /rest/api/user/registers:
   *   post:
   *      summary: Register User
   *      description: Welcome to register user
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                      firstName:
   *                        type: string
   *                        default: John
   *                        required: true
   *                      lastName:
   *                        type: string
   *                        default: Doe
   *                        required: true
   *                      email:
   *                        type: string
   *                        required: true
   *                        example: email@gmail.com
   *                      password:
   *                        type: string
   *                        default: 123
   *                      permissions:
   *                        type: array
   *                        item:
   *                          type: string
   *                        example: ['ADMIN']
   *                        default: ['ADMIN']
   *      responses:
   *        default:
   *         description: Register user success
   */

  /**
   * REGISTER USER
   * @param {*} args
   * @param {*} opts
   */
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
        password = args.password;
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
   * LOGIN USER
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
        type: 'BoardModel'
      });
      console.log('🚀 ~ file: web-admin-user.js ~ line 129 ~ testSequelize', testSequelize);

      /**
       * get user login
       */
      const userLogin = await dataStore.findOne({
        type: 'UserModel',
        filter: {
          email: args.email
        }
      });
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
        expiresIn: dataSecret.tokenLife
      });
      /**
       * create refresh token
       */
      const refreshToken = jwt.sign({ userLogin }, dataSecret.refreshTokenSecret, {
        expiresIn: dataSecret.refreshTokenLife
      });

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
        name: userLogin.firstName + ' ' + userLogin.lastName,
        permissions: userLogin.permissions
      };
    } catch (err) {
      loggerFactory.error(`function loginUser has error`, {
        requestId: `${requestId}`,
        args: { err }
      });
      return Promise.reject(err);
    }
  };

  /**
   * @swagger
   * /rest/api/user/refreshTokens:
   *   post:
   *      summary: Refresh token
   *      description: Welcome to refresh token user
   *      requestBody:
   *          required: true
   *          content:
   *            application/json:
   *                schema:
   *                  type: object
   *                  properties:
   *                      refreshToken:
   *                        type: string
   *      responses:
   *        default:
   *         description: Refresh token success
   */

  /**
   * REFRESH TOKEN
   * @param {*} args
   * @param {*} opts
   */
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
            expiresIn: dataSecret.tokenLife
          });
          /**
           * post new refresh token
           */
          newRefreshToken = jwt.sign({ userLogin }, dataSecret.refreshTokenSecret, {
            expiresIn: dataSecret.refreshTokenLife
          });
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
        name: userLogin.firstName + ' ' + userLogin.lastName,
        permissions: userLogin.permissions
      };
    } catch (err) {
      loggerFactory.error(`function refreshToken has error`, {
        requestId: `${requestId}`,
        args: { err }
      });
      return Promise.reject(err);
    }
  };
}

UserService.reference = {
  dataStore: 'app-repository/dataStore',
  dataSequelize: 'app-repository/dataSequelize',
  errorManager: 'app-error-manager/errorManager'
};

exports = module.exports = new UserService();
exports.register = UserService;
