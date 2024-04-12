const asyncHandler = require('express-async-handler');

const jwt = require('jsonwebtoken');
/**
 * check every request to be make sure user is authorized
 */
const validateTooken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
        throw new Error('User is not authorized');
      } else {
        req.user = decoded.user;
        next();
      }
    });
  }
  if (!token) {
    res.sendStatus(401);
    throw new Error('User is not authorized');
  }
});
/**
 * 
 * @param {*} dataUser  it must be like username: user.username,
          email: user.email,
          id: user.id,
  *@param {string} timeout when it times outstamp tooken will be expired
  *@param {string} secret 
 */

function createTooken(dataUser, timeout, secret) {
  const tooken = jwt.sign(
    {
      user: {
        dataUser,
      },
    },
    secret,
    { expiresIn: timeout }
  );
  return tooken;
}
/**
 * return data user from tooken
 * @param {*} token
 */
function readTooken(token, secret) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log('first', secret, err);
        reject(Error('Read tooken is faild '));
      } else {
        console.log(decoded.user);
        resolve(decoded.user);
      }
    });
  });
}

module.exports = { validateTooken, readTooken, createTooken };
