const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
require("./conn/conn");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const Cart=require("./routes/cart");
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send('Server is running');
});

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", bookRoutes);
app.use("/api/v1", Cart);

// Creating port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
