const express = require('express');
const router = express.Router();
const fieldOfficerController = require('../controller/fieldOfficerController');

// Create a new Field Officer
router.post('/', fieldOfficerController.createFieldOfficer);

// Get all Field Officers
router.get('/', fieldOfficerController.getAllFieldOfficers);

// Get Field Officer by ID
router.get('/:id', fieldOfficerController.getFieldOfficerById);

// Update Field Officer by ID
router.put('/:id', fieldOfficerController.updateFieldOfficer);

// Delete Field Officer by ID
router.delete('/:id', fieldOfficerController.deleteFieldOfficer);

module.exports = router;
