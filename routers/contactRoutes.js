const express = require('express');
const {
  deleteContact,
  getContact,
  createContact,
  updateContact,
  getContacts,
} = require('../controllers/contactController');
const { validateTooken } = require('../middleware/validateTooken');
let multer = require('multer');
let upload = multer();

const router = express.Router();
router.use(validateTooken);
router
  .route('/')
  .get(getContacts)
  .post(upload.single(['avatar']), createContact);
router
  .route('/:id')
  .put(upload.single(['avatar']), updateContact)
  .get(getContact);

router
  .route('/:id')

  .delete(deleteContact);

module.exports = router;
