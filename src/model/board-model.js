'use strict';

const winext = require('winext');
const mongoose = winext.require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  registerDate: { type: Date },
  title: { type: String },
  name: { type: String },
  description: { type: String },
  //filter
  deleted: { type: Boolean, default: false },
});

const Board = mongoose.model('BoardModel', BoardSchema, 'boards');
module.exports = Board;