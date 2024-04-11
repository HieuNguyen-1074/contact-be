const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// @desc
/**
 * create a user
 * @method POST /users/register
 */
const registerUser = asyncHandler(async (req, res) => {
  const { password, email, username } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('please add all fields');
  }

  const userAvalable = await User.findOne({ email });
  if (userAvalable) {
    res.status(400);
    throw new Error('user already exist');
  }
  // hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('user data use not valid');
  }
});

/**
 * login
 * @method POST /users/login
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('please enter all fields');
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    res.json({
      accessToken,
      username: user.username,
      email: user.email,
      id: user.id,
    });
  } else {
    res.status(401);
    throw new Error('email or password not valid');
  }
});

/**
 * get  user by id
 * @method GET /users/current
 */
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  currentUser,
  loginUser,
};
