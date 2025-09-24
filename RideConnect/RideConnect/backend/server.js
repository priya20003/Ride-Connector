// server.js - RideConnect backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);

// Simple health check
app.get('/', (req, res) => res.json({status: 'RideConnect API is running'}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
