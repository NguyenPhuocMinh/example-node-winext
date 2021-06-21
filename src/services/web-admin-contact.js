'use strict';

function ContactService(params = {}) {
  this.contact = async function (args, opts = {}) {

    return { message: 'Hello NodeJs' }
  }
};

exports = module.exports = new ContactService();
exports.register = ContactService;
