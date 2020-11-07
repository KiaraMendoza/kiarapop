'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const connectionPromise = require('../lib/connectAMQP');

// const queueName = 'tasks';

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  rol: { type: String }
});

userSchema.statics.hashPassword = function(passwordToHash) {
  return bcrypt.hash(passwordToHash, 10);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
