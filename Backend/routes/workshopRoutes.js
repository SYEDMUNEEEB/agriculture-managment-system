const express = require('express');
const router = express.Router();
const workshopController = require('../controller/workshopController');

// Define routes
router.get('/workshops', workshopController.getAllWorkshops);
router.get('/workshops/:id', workshopController.getWorkshopById);
router.post('/', workshopController.createWorkshop);
router.put('/workshops/:id', workshopController.updateWorkshop);
router.delete('/workshops/:id', workshopController.deleteWorkshop);

module.exports = router;
