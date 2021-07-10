'use strict';

function HomeService(params = {}) {
  /**
   * @swagger
   * /rest/api/:
   *   get:
   *      summary: Home Page
   *      description: Welcome to home admin
   *      parameters:
   *        - in: header
   *          name: X-Access-Token
   *          schema:
   *            type: string
   *          required: true
   *      responses:
   *        200:
   *         description: Success
   */

  /**
   * HOME
   * @param {*} args
   * @param {*} opts
   */
  this.home = function (args, opts = {}) {
    return { message: 'Welcome to home user admin page' };
  };
}

exports = module.exports = new HomeService();
exports.register = HomeService;
