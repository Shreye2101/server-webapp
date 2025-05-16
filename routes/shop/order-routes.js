const express = require("express");
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

const {
  createPayment: createPaypalPayment, // ✅ Alias to avoid naming conflict
} = require("../../controllers/shop/paypal-controller");

const router = express.Router();

// Create a new order (Cash or PayPal)
router.post("/create", createOrder);

// ✅ Create PayPal payment route using correct controller
router.post("/create-payment", createPaypalPayment);

// Capture PayPal payment
router.post("/capture", capturePayment);

// Get all orders by user ID
router.get("/user/:userId", getAllOrdersByUser);

// Get a specific order by order ID
router.get("/details/:id", getOrderDetails);

module.exports = router;
