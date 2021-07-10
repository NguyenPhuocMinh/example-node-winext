'use strict';

function HealthCheckService(params = {}) {
  /**
   * @swagger
   * /rest/api/healths:
   *   get:
   *      summary: Heal check connect consul
   *      description: Welcome to health check user
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
   * HEALTH CHECK
   * @param {*} args
   * @param {*} opts
   */
  this.healthCheck = function (args, opts = {}) {
    return { message: 'User service connect consul successfully!' };
  };
}

exports = module.exports = new HealthCheckService();
exports.register = HealthCheckService;
