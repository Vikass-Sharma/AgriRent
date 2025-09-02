const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// CORS configuration for production and development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL || 'https://agrirent-frontend.onrender.com',
        process.env.BACKEND_URL || 'https://agrirent-backend.onrender.com'
      ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/bookings2', require('./routes/bookings2'));

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../agriRental_frontend2-main/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../agriRental_frontend2-main/build/index.html'));
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AgriRent API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Agriculture Equipment Rental Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Serving React app from build directory');
  }
});

// Payment hold cleanup service
const { cleanupExpiredPaymentHolds } = require('./controllers/bookingController2');

setInterval(async () => {
  try {
    const result = await cleanupExpiredPaymentHolds();
    if (result.expiredCount > 0) {
      console.log(`Cleaned up ${result.expiredCount} expired payment holds`);
    }
  } catch (error) {
    console.error('Payment hold cleanup error:', error);
  }
}, 60000); // Run every 60 seconds

console.log('Payment hold cleanup service started - running every 60 seconds');

// Initialize admin user
const { initializeAdmin } = require('./controllers/userController');
initializeAdmin();