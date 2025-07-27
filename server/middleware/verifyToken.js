// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
 // or load from .env

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

  } else {
    return res.status(401).json({ error: "Token missing or invalid" });
  }
};

module.exports = verifyToken;
