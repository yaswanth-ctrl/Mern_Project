import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET /api/orders - list orders for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/orders - create order from cart
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const items = cart.items.map(i => ({ product: i.product._id, qty: i.qty, price: i.product.price }));
    const total = items.reduce((s, it) => s + it.qty * it.price, 0);

    const order = new Order({ user: req.user._id, items, total, address });
    await order.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
