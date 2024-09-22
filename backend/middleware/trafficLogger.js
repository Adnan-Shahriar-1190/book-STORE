// middleware/trafficLogger.js
const Visit = require('../models/visitSchema');

const trafficLogger = async (req, res, next) => {
  try {
    // Capture user ID if authenticated; otherwise, it will be null
    const userId = req.user ? req.user.id : null;

    // Create a new visit entry
    const newVisit = new Visit({
      userId: userId,
      visitDate: new Date(),
    });

    await newVisit.save(); // Save the visit to the database
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Error logging visit:", error);
    next(); // Proceed even if there's an error
  }
};

module.exports = trafficLogger;
