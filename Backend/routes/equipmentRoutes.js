const express = require('express');
const router = express.Router();
const equipmentController = require('../controller/equipmentController');

// Route to create a new equipment
router.post('/', equipmentController.createEquipment);

// Route to get all equipment
router.get('/', equipmentController.getAllEquipment);
// Route to get all equipment
router.get('/:id', equipmentController.getEquipment);

// Route to update equipment by ID
router.put('/:id', equipmentController.updateEquipment);

// Route to delete equipment by ID
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
