'use strict';

const winext = require('winext');
const mongoose = winext.require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  permissions: [String],
  //filter
  slug: { type: String },
  deleted: { type: Boolean, default: false },
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: Date },
  updatedBy: { type: String },
});

const User = mongoose.model('UserModel', UserSchema, 'users');
module.exports = User;