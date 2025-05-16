const { paypalClient, paypal } = require("../../helpers/paypal");

// Step 1: Create PayPal Order (not "payment" anymore)
const createPayment = async (req, res) => {
  const { totalAmount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalAmount,
        },
      },
    ],
    application_context: {
      return_url: "http://localhost:5173/paypal-success",
      cancel_url: "http://localhost:5173/paypal-cancel",
    },
  });

  try {
    const order = await paypalClient.execute(request);
    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(200).json({
      success: true,
      approval_url: approvalUrl,
      orderID: order.result.id,
    });
  } catch (error) {
    console.error("PayPal Order Create Error:", error);
    res.status(500).json({ success: false, error });
  }
};

// Step 2: Capture payment after user approval
const executePayment = async (req, res) => {
  const { token } = req.query; // 'token' is PayPal Order ID

  const request = new paypal.orders.OrdersCaptureRequest(token);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.status(200).json({
      success: true,
      message: "Payment successful!",
      payment: capture.result,
    });
  } catch (error) {
    console.error("PayPal Capture Error:", error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = { createPayment, executePayment };
