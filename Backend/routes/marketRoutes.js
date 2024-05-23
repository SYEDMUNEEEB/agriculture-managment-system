// routes/marketRoutes.js
const express = require('express');
const router = express.Router();
const marketController = require('../controller/marketController');
const multer = require('multer');

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle image upload for products
router.post('/upload', upload.single('image'), marketController.uploadProductImage);

// Route to create a new market
router.post('/', marketController.createMarket);

// Route to get all markets
router.get('/', marketController.getAllMarkets);

// Route to get a market by its ID
router.get('/:id', marketController.getMarketById);

// Route to update a market by its ID
router.put('/:id', marketController.updateMarket);

// Route to delete a market by its ID
router.delete('/:id', marketController.deleteMarket);

// Route to create a new product with image upload
router.post('/create', marketController.createProduct);
// Update product by ID

router.put('/markets/:marketId/products/:productId', marketController.updateProduct);

// Delete product by ID
router.delete('/markets/:marketId/products/:productId', marketController.deleteProduct);

module.exports = router;
