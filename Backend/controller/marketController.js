const Market = require('../models/Market');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const multer = require('multer')
// Define allowed file types
// Define multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dlpygcbme',
  api_key: '385585823958233',
  api_secret: 'kPwYZ9xBXAt6bflvbqehmKPcBLM',
  secure: true,
});



// Handle image upload
exports.uploadProductImage = async (req, res) => {
  try {
    // Ensure the images directory exists
    const directory = path.join(__dirname, '../images');
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }


    await sharp(req.file.buffer)
      .png()
      .toFile(path.join(directory, req.file.originalname));

    var dir = path.join(directory, req.file.originalname)

    const uploadResult = await cloudinary.uploader.upload(dir || req.file.buffer, {
      public_id: req.file.originalname,
    });
    fs.unlink(dir, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
        return;
      }
      console.log('Image deleted successfully');
    })

    res.status(201).json({ message: 'Image uploaded successfully', "file": uploadResult.url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};

// Example route handler for processing uploaded image
exports.processProductImage = async (req, res) => {
  try {
    // Ensure the images directory exists
    const directory = path.join(__dirname, '../images');
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Process the uploaded image using sharp and save to the images directory
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(path.join(directory, req.file.originalname)); // Use path.join to create a platform-independent file path
    res.status(201).send('Image uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
};



// Create a new market
exports.createMarket = async (req, res) => {
  try {
    const { name, location, imgUrl } = req.body;
    const market = new Market({ name, location, imgUrl });
    await market.save();
    res.status(201).json({ message: 'Market created successfully', market });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create market' });
  }
};

// Get all markets
exports.getAllMarkets = async (req, res) => {
  try {
    const markets = await Market.find();
    res.status(200).json({ markets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch markets' });
  }
};

// Get market by ID
exports.getMarketById = async (req, res) => {
  try {
    const marketId = req.params.id;
    const market = await Market.findById(marketId);
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }
    res.status(200).json({ market });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch market' });
  }
};

// Update market by ID
exports.updateMarket = async (req, res) => {
  try {
    const marketId = req.params.id;
    const { name, location, imgUrl } = req.body;
    const updatedMarket = await Market.findByIdAndUpdate(marketId, { name, location, imgUrl }, { new: true });
    if (!updatedMarket) {
      return res.status(404).json({ message: 'Market not found' });
    }
    res.status(200).json({ message: 'Market updated successfully', market: updatedMarket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update market' });
  }
};

// Delete market by ID
exports.deleteMarket = async (req, res) => {
  try {
    const marketId = req.params.id;
    const deletedMarket = await Market.findByIdAndDelete(marketId);
    if (!deletedMarket) {
      return res.status(404).json({ message: 'Market not found' });
    }
    res.status(200).json({ message: 'Market deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete market' });
  }
};

// Create a new product with image upload
exports.createProduct = async (req, res) => {
  try {
    const { marketId, name, price, imgUrl } = req.body;

    console.log('Received request to create product with marketId:', marketId);

    // Check if market exists
    const market = await Market.findById(marketId);
    if (!market) {
      console.log('Market not found for ID:', marketId);
      return res.status(404).json({ message: 'Market not found' });
    }

    console.log('Found market:', market);

    // Save product details to market
    market.products.push({ name, price, imgUrl });
    await market.save();

    console.log('Product created successfully:', market.products[market.products.length - 1]);

    res.status(201).json({ message: 'Product created successfully', product: market.products[market.products.length - 1] });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { marketId, productId } = req.params;
    const { name, price, imgUrl } = req.body;
    const market = await Market.findById(marketId);
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    const product = market.products.id(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.set({ name, price, imgUrl });
    await market.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { marketId, productId } = req.params;
    // Check if market exists
    const market = await Market.findById(marketId);
    if (!market) {
      return res.status(404).json({ message: 'Market not found' });
    }

    // Find the product within the market
    const productIndex = market.products.findIndex(product => product._id.toString() === productId);
    if (productIndex <-1) {
      console.log("test1")
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove the product from the market
    market.products.splice(productIndex, 1);

    // Save the updated market
    await market.save();
    console.log("test2");
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};