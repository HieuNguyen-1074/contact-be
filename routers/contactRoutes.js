const express = require('express');
const {
  deleteContact,
  getContact,
  createContact,
  updateContact,
  getContacts,
} = require('../controllers/contactControler');
const { validateTooken } = require('../middleware/validateTooken');

const router = express.Router();
router.use(validateTooken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').put(updateContact).get(getContact).delete(deleteContact);

module.exports = router;
