// routes/traffic.js
const express = require("express");
const router = express.Router();
const Visit = require("../models/visitSchema");

// Endpoint to get visits grouped by date
router.get("/visits", async (req, res) => {
  try {
    const visits = await Visit.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);

    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching visit data" });
  }
});

module.exports = router;
