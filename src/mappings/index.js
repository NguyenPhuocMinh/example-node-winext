'use strict';

const HomeMapping = require('./router/home-mapping');
const UserMappings = require('./router/user-mapping');
const ContactMappings = require('./router/contact-mapping');
const BoardMappings = require('./router/board-mapping');
const HealthCheckMappings = require('./router/health-check-mapping');

const mappings = [
  ...HomeMapping,
  ...UserMappings,
  ...ContactMappings,
  ...BoardMappings,
  ...HealthCheckMappings
];

module.exports = mappings;
