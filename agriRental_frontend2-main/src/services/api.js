const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// CORS configuration for your specific URLs
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://agrirent-frontend-1nep.onrender.com',
        'https://agrirent-backend-tpv9.onrender.com'
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

// Root route for backend status
app.get('/', (req, res) => {
  res.json({
    message: 'AgriRent API Server',
    status: 'Running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      users: '/api/users', 
      equipment: '/api/equipment',
      bookings: '/api/bookings2',
      health: '/health'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'AgriRent API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Agriculture Equipment Rental Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API available at: http://localhost:${PORT}`);
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
}, 60000);

console.log('Payment hold cleanup service started - running every 60 seconds');

// Initialize admin user
const { initializeAdmin } = require('./controllers/userController');
initializeAdmin();