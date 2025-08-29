const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) res.json({ message: "Login successful", user });
  else res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
