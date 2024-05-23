const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const marketRoutes = require('./routes/marketRoutes'); 
const farmRoutes = require('./routes/farmRoutes'); // Import farm routes
const { isAuthenticated, isAdmin } = require('./middleware/adminMiddleware'); // Import your middleware
const WorkshopRoutes = require('./routes/WorkshopRoutes');
const EquipmentRoutes = require('./routes/equipmentRoutes');
const contactRoutes=require('./routes/contactRoutes')
const seminarRoutes=require('./routes/seminarRoutes')
const fieldOfficerRoutes = require('./routes/fieldOfficerRoutes');
// Load environment variables from .env file
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend of your MERN stack application!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workshop', WorkshopRoutes)
app.use('/api/equipment', EquipmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/seminar', seminarRoutes)

app.use('/api/fieldOfficers', fieldOfficerRoutes);
// Apply middleware to weatherRoutes
app.use('/api/weather', weatherRoutes);

// Apply middleware to farmRoutes
app.use('/api/farm', isAuthenticated, farmRoutes);
app.use('/api/market', marketRoutes);
// Define port
const PORT = process.env.PORT || 9000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
