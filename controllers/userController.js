const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { createTooken, readTooken } = require('../middleware/validateTooken');
const {
  TOOKEN_EXPIRED_TIMEOUT,
  REFRESH_TOOKEN_EXPIRED_TIMEOUT,
} = require('../config/contants');
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
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('please enter all fields');
    }
    const user = await User.findOne({ email });
    // user is already exist
    if (user) {
      const dataRes = {
        username: user.username,
        email: user.email,
        id: user.id,
      };

      const accessTooken = createTooken(
        dataRes,
        TOOKEN_EXPIRED_TIMEOUT,
        process.env.ACCESS_TOKEN_SECRET
      );
      const refreshTooken = createTooken(
        dataRes,
        REFRESH_TOOKEN_EXPIRED_TIMEOUT,
        process.env.ACCESS_REFRESH_TOKEN_SECRET
      );
      // response
      res.status(200).json({
        ...dataRes,
        refreshTooken,
        accessTooken,
      });
    } else {
      res.status(400);
      throw new Error('email or password not valid');
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error('error login');
  }
});

/**
 * login
 * @method POST /users/login
 */
const refreshTooken = asyncHandler(async (req, res) => {
  const { refreshTooken } = req.body;
  try {
    if (!refreshTooken) {
      res.status(400);
      throw new Error('Can not refresh');
    }
    const { dataUser: user } = await readTooken(
      refreshTooken,
      process.env.ACCESS_REFRESH_TOKEN_SECRET
    );
    // user is already exist
    if (user) {
      const dataRes = {
        username: user.username,
        email: user.email,
        id: user.id,
      };
      const accessTooken = createTooken(
        dataRes,
        TOOKEN_EXPIRED_TIMEOUT,
        process.env.ACCESS_TOKEN_SECRET
      );
      // response
      res.status(200).json({
        accessTooken,
        refreshTooken,
      });
    } else {
      res.status(400);
      throw new Error('Can not refresh');
    }
  } catch (error) {
    res.status(400);
    throw new Error('Can not refresh');
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
  refreshTooken,
};

// && (await bcrypt.compare(password, user.password))
