const router = require("express").Router();
const { query, validationResult } = require('express-validator');
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Sign Up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Check username length is more than 4
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 6" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      address: address,
    });

    await newUser.save();
    return res.status(200).json({ message: "SignUp Successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Sign In
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare the password
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get-user info
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address Updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete user --admin
router.delete("/delete-user", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    await User.findByIdAndDelete(id) ;
    return res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/search-users", async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Search users by username or email
    const users = await User.find({
      $or: [
        { username: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by username
        { email: { $regex: searchTerm, $options: "i" } },    // Case-insensitive search by email
      ],
    }).select("-password");

    return res.json({
      status: "Success",
      data: users,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "An error occurred while searching users" });
  }
});




module.exports = router;
