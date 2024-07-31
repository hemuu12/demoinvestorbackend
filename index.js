const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payment');
const tokenRoutes = require('./routes/token');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/tokens', tokenRoutes);

app.options('*', cors(corsOptions)); // Preflight requests

module.exports = app;
