const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const { default: mongoose } = require('mongoose');
const { uploadInageToFirebase } = require('../middleware/firebaseAction');
// @desc

/**
 * get all contacts
 */
const getContacts = asyncHandler(async (req, res) => {
  console.log(req.user);
  const contacts = await Contact.find({ user_id: req.user.dataUser.id });
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
  const { name, email, phone, avatarLink } = req.body;
  const avatar = req.file;
  try {
    if (!name || !email || !phone || !avatar) {
      console.log('first');
      res.status(400);
      throw new Error('all fields are required');
    }
    const url = await uploadInageToFirebase(avatar);
    console.log(avatar);
    const contact = await Contact.create({
      user_id: req.user?.dataUser.id,
      name,
      phone,
      email,
      avatar: url,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500);
    throw new Error('server error' + error);
  }
});
/**
 * update a contact by id
 */
const updateContact = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400);
      throw new Error('Invalid contact id');
    }
    const { name, email, phone, avatar } = req.body;
    const avatarFile = req.file;
    console.log(avatarFile);
    if (!name || !email || !phone || !(avatar || avatarFile)) {
    }
    const contact = await Contact.findById(req.params.id);
    console.log(contact, req.user.dataUser.id);
    const url = avatar || (await uploadInageToFirebase(avatarFile));
    const updateData = {
      name,
      email,
      phone,
      avatar: url,
    };
    if (contact.user_id.toString() !== req.user.dataUser.id) {
      res.status(403);
      throw new Error('User not authorized');
    }
    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );
    res.status(200).json(updateContact);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error('Server error');
  }
});
/**
 * delete a contact by id
 */
const deleteContact = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400);
      throw new Error('Invalid contact id');
    }
    const contact = ' await Contact.findById(req.params.id);';

    if (contact?.user_id?.toString() !== req?.user?.id) {
      res.status(403);
      throw new Error('User not authorized');
    }
    await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    res.status(200).json(`contact remove is ${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error('Server error');
  }
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};
