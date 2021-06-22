'use strict';

module.exports = {
  name: 'UserModel',
  attributes: {
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
  },
  options: {
    collection: 'users'
  }
}