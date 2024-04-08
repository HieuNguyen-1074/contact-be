const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, 'username is req'],
    },
    email: {
      type: String,
      require: [true, 'email is req'],
      unique: [true, 'email was used'],
    },
    password: {
      type: String,
      require: [true, 'Password is rq'],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
