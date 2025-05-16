// routes/shop/order-routes.js
const express = require("express");
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

// Create a new order (Cash or PayPal)
router.post("/create", createOrder);

// Capture PayPal payment
router.post("/capture", capturePayment); // renamed to keep it short & clean

// Get all orders by user ID
router.get("/user/:userId", getAllOrdersByUser);

// Get a specific order by order ID
router.get("/details/:id", getOrderDetails);

module.exports = router;
