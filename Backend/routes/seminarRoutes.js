const express = require('express');
const router = express.Router();
const seminarController = require('../controller/seminarController');

// Route to create a new seminar
router.post('/', seminarController.createSeminar);

// Route to get all seminars
router.get('/', seminarController.getAllSeminars);
router.get('/:id', seminarController.getSeminar);

// Route to delete a seminar by ID
router.delete('/:id', seminarController.deleteSeminar);

module.exports = router;
