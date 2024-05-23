const axios = require('axios');
const { WEATHER_API_KEY } = process.env; // Assuming you have an environment variable for your API key

// Controller function to get current weather
exports.getCurrentWeather = async (req, res) => {
    try {
        const city = req.query.city; // Obtain the city from the request query parameters
        const WEATHER_API_KEY = "33eda94d295d3e2c81f673f09e21d261"; // Assuming you have an environment variable for your API key
        // Make API request to fetch current weather data
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);

        // Extract relevant data from the response
        const { name, weather, main } = response.data;
        const currentWeather = {
            city: name,
            description: weather[0].description,
            temperature: main.temp,
            humidity: main.humidity,
        };

        // Send current weather data in the response
        res.status(200).json(currentWeather);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to fetch current weather' });
    }
};

// Controller function to get weather forecast
exports.getWeatherForecast = async (req, res) => {
    try {
        const city = req.query.city;
        const WEATHER_API_KEY = "33eda94d295d3e2c81f673f09e21d261";
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        const forecastData = response.data.list.map(item => ({
            date: item.dt_txt,
            description: item.weather[0].description,
            temperature: item.main.temp,
            humidity: item.main.humidity,
        }));
        res.status(200).json(forecastData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to fetch weather forecast' });
    }
};
