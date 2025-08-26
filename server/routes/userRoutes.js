const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Make sure the path is correct
const verifyToken = require("../middlewares/verifyToken");
require("dotenv").config(); // ✅ Load env variables
// POST route to create a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for required fields
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


const jwt = require("jsonwebtoken"); // Optional if you want token-based login
// Replace with your own secure key or load from .env
const secretKey = process.env.JWT_SECRET; // ✅ Use env secret key

// POST route for login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Find user by username OR email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, secretKey, {
      expiresIn: "30d"
    });

    //res.status(200).json({ message: "Login successful", token });
     res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.username,
        email: user.email,
        id: user._id
      }
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Protected Profile Route
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user // token payload (id, username, email)
  });
});
// for logout
router.post("/logout", (req, res) => {
  // For JWT, you can just respond OK
  res.json({ message: "Logged out successfully" });
});

module.exports = router;