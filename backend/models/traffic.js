// models/traffic.js
const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  ip: String, // IP address of the visitor
  url: String, // Page URL that was visited
  method: String, // HTTP method (GET, POST, etc.)
  timestamp: {
    type: Date,
    default: Date.now, // Automatically store the time of the visit
  },
});

module.exports = mongoose.model('Traffic', trafficSchema);
