// middleware/trafficLogger.js
const Traffic = require('../models/traffic');

const trafficLogger = async (req, res, next) => {
  try {
    const trafficData = {
      ip: req.ip || req.connection.remoteAddress, // Get the visitor's IP address
      url: req.originalUrl, // The URL the visitor accessed
      method: req.method, // HTTP method
    };

    // Save traffic data to MongoDB
    await Traffic.create(trafficData);

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error logging traffic:', error);
    next();
  }
};

module.exports = trafficLogger;
