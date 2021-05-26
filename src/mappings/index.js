'use strict';

const UserMappings = require('./router/user-mapping');
const ContactMappings = require('./router/contact-mapping');
const BoardMappings = require('./router/board-mapping');

const mappings = [
  ...UserMappings,
  ...ContactMappings,
  ...BoardMappings
];

module.exports = mappings;