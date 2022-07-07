'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20
  },
  description: {
    type: String,
    maxlength: 100
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  picture: {
    type: String
  }
});

const Group = mongoose.model('Group', schema);

module.exports = Group;
