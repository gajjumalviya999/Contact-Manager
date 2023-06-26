const express = require('express');
const { getContact, getContacts, createContact, updateContact, deleteContact } = require('./controllers');
const router= express.Router();

router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router
