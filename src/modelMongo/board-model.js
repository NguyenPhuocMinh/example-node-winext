'use strict';

module.exports = {
  name: 'BoardModel',
  attributes: {
    name: { type: String },
    description: { type: String },
    title: { type: String },
    registerDate: { type: Date },
    //filter
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String },
  },
  options: {
    collection: 'boards'
  }
}