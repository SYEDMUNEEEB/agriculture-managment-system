

const express = require('express');
const router = express.Router();
const farmController = require('../controller/farmController');

// Create a new farm
router.post('/create', farmController.createFarm);

// Get details of a specific farm
router.get('/', farmController.getAllFarm);
// Get details of a specific farm
router.get('/:id', farmController.getFarm);

// Update information of a specific farm
router.put('/:id', farmController.updateFarm);

// Delete a specific farm
router.delete('/:id', farmController.deleteFarm);

module.exports = router;
