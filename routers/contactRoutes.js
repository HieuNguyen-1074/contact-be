const express = require('express');
const {
  deleteContact,
  getContact,
  createContact,
  updateContact,
  getContacts,
} = require('../controllers/contactControler');
const validateToken = require('../middleware/validateToken');

const router = express.Router();
router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').put(updateContact).get(getContact).delete(deleteContact);

module.exports = router;
