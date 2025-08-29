const express = require("express");
const router = express.Router();

let cart = [];

// Get Cart
router.get("/", (req, res) => {
  res.json(cart);
});

// Add to Cart
router.post("/", (req, res) => {
  cart.push(req.body);
  res.json({ message: "Added to cart", cart });
});

module.exports = router;
