const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Route to create a new contact
router.post('/', contactController.createContact);

// Route to get all contacts
router.get('/', contactController.getAllContacts);

router.get('/userContacts/:id', contactController.getUserContacts);
router.post('/userContacts', contactController.sendUserContacts);

router.get('/adminContacts/:id', contactController.getAdminContacts);
router.post('/adminContacts', contactController.sendAdminContacts);

// Route to delete a contact by ID
router.delete('/:id', contactController.deleteContact);

module.exports = router;
