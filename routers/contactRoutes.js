const express = require('express');
const {
  deleteContact,
  getContact,
  createContact,
  updateContact,
  getContacts,
} = require('../controllers/contactControler');
const { validateTooken } = require('../middleware/validateTooken');
let multer = require('multer');
let upload = multer();

const router = express.Router();
router.use(validateTooken);
router
  .route('/')
  .get(getContacts)
  .post(upload.single(['avatar']), createContact);
router.route('/:id').put(updateContact).get(getContact).delete(deleteContact);

module.exports = router;
