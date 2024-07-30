const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payment');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/tokens', require('./routes/token'));

module.exports = app;
