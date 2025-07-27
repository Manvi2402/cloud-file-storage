const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Adjust path if needed
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI
const mongoURI = process.env.MONGO_URI
// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Log every request (optional for debugging)
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});

// Mount user routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello, Cloud Queen 👑!");
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});