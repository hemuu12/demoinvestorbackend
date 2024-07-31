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

const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    optionsSuccessStatus: 204 // Some legacy browsers choke on 204
  };
  
  app.use(cors(corsOptions));
  
  // Handle Preflight Requests
  app.options('*', cors(corsOptions));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/tokens', tokenRoutes);

app.options('*', cors(corsOptions)); // Preflight requests

module.exports = app;
