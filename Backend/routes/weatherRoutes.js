const express = require('express');
const router = express.Router();

// Import the controller functions for weather
const weatherController = require('../controller/weatherController');

// Define routes for weather functionality

// Example route to get current weather
router.get('/current', weatherController.getCurrentWeather);

// Example route to get weather forecast
router.get('/forecast', weatherController.getWeatherForecast);

// Other routes for additional weather functionality can be added here

module.exports = router;
