'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');

function ContactService(params = {}) {
  const { dataStore } = params;
  this.contact = async function (args, opts = {}) {

    const userLogin = await dataStore.findOne({
      type: 'UserModel',
      filter: {
        email: "admin@gmail.com"
      }
    })
    console.log("🚀 ~ file: web-admin-contact.js ~ line 17 ~ userLogin", userLogin)

    return { message: 'hello' }
  }
};

ContactService.reference = {
  dataStore: 'app-repository/dataStore',
  errorManager: 'app-runserver/errorManager'
}

exports = module.exports = new ContactService();
exports.register = ContactService;
