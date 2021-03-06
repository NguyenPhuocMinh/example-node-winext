'use strict';

module.exports = [
  /**
   * HOME
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/home'
  },
  /**
   * CONTACT
   */
  {
    enable: true,
    method: 'GET',
    pathName: '/contacts'
  },
  /**
   * REFRESH TOKEN
   */
  {
    enable: true,
    method: 'POST',
    pathName: '/user/refreshTokens'
  }
];
