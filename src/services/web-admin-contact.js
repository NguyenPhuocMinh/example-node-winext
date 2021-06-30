'use strict';

function ContactService(params = {}) {

  /**
   * @swagger
   * /rest/api/contacts:
   *   get:
   *      summary: Get Contact
   *      description: Welcome to contact
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
   * 
   * @param {*} args 
   * @param {*} opts 
   */
  this.contact = async function (args, opts = {}) {
    return { message: 'Hello NodeJs' }
  }
};

exports = module.exports = new ContactService();
exports.register = ContactService;
