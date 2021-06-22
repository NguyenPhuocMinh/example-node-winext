'use strict';

const { Sequelize } = require('winext-repository').sequelizeStore;

module.exports = {
  name: 'User',
  attributes: {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    permissions: [Sequelize.STRING],
    //filter
    slug: { type: Sequelize.STRING },
    deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
    createdAt: { type: Sequelize.DATE },
    createdBy: { type: Sequelize.STRING },
    updatedAt: { type: Sequelize.DATE },
    updatedBy: { type: Sequelize.STRING },
  },
  options: {}
}