const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
require("./conn/conn");
const userRoutes = require("./routes/user");
const Books = require("./routes/book");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", Books);

// Creating port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
