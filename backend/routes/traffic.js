// routes/traffic.js
const express = require('express');
const router = express.Router();
const Traffic = require('../models/traffic');

// Route to get traffic data
router.get('/traffic', async (req, res) => {
  try {
    // Retrieve all traffic data
    const trafficData = await Traffic.find().sort({ timestamp: -1 }); // Sort by latest
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching traffic data' });
  }
});

module.exports = router;
