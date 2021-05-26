'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');

function ContactService() {
  this.contact = async function (args, opts = {}) {
    return { message: 'hello' }
  }
};

exports = module.exports = new ContactService();
exports.register = ContactService;
