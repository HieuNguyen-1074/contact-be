const express = require('express');
const {
  registerUser,
  currentUser,
  loginUser,
} = require('../controllers/userController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();
router.post('/register', registerUser);
router.get('/current', validateToken, currentUser);
router.post('/login', loginUser);

module.exports = router;
