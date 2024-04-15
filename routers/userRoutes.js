const express = require('express');
const {
  registerUser,
  currentUser,
  loginUser,
  refreshTooken,
} = require('../controllers/userController');
const { validateTooken } = require('../middleware/validateTooken');

const router = express.Router();
router.post('/register', registerUser);
router.get('/current', validateTooken, currentUser);
router.post('/login', loginUser);
router.post('/refresh-tooken', refreshTooken);

module.exports = router;
