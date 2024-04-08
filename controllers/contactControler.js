const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { default: mongoose } = require('mongoose');
// @desc

/**
 * get all contacts
 */
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
/**
 * get contact by id
 */
const getContact = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid contact id');
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});
/**
 * create a contact
 */
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('all fields are required');
  }

  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    phone,
    email,
  });

  res.status(201).json(contact);
});
/**
 * update a contact by id
 */
const updateContact = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid contact id');
  }
  const contact = await Contact.findById(req.params.id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized');
  }
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContact);
});
/**
 * delete a contact by id
 */
const deleteContact = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid contact id');
  }
  const contact = await Contact.findById(req.params.id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized');
  }
  await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  res.status(200).json(`contact remove is ${req.params.id}`);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};
