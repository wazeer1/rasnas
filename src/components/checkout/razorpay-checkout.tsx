// pages/api/get-razorpay-order.js
import http from "@framework/utils/http";
import axios from "axios";
import Razorpay from "razorpay";
import { toast } from "react-toastify";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { purchase_id } = req.body;

    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // You should have the logic to fetch the order based on purchase_id
      // For example, fetch the order from your database (here we're assuming it's already created)
      const orderDetails = await razorpay.orders.fetch(purchase_id);

      if (orderDetails) {
        res.status(200).json({
          order_id: orderDetails.id,
          amount: orderDetails.amount / 100, // Amount in INR
        });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export const checkoutRazorPay = async (order_id, amount, purchase) => {
  try {
    // Razorpay options
    const options = {
      key: "rzp_test_vuin89clCnbj7l", // Razorpay public key
      amount: amount * 100, // Amount in smallest currency unit (e.g., paise)
      currency: "INR",
      name: "RASNAS Boutique",
      description: "Test Transaction",
      order_id: order_id, // Order ID from backend
      handler: async function (response) {
        try {
          // Verify the payment
          const verifyResponse = await axios.post(
            "https://api.rasnasboutique.com/api/v1/payments/verify-payment/",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              purchase_id: purchase,
            }
          );

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            toast.success("Payment verified successfully!");
          } else {
            toast.error(verifyData.message || "Payment verification failed.");
          }
        } catch (error) {
          console.error("Verification Error:", error);
          toast.error("Error verifying payment. Please contact support.");
        }
      },
      prefill: {
        name: "John Doe", // Prefill user name
        email: "john.doe@example.com", // Prefill email
        contact: "9876543210", // Prefill contact
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Load Razorpay checkout UI
    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.error("Payment Failed:", response.error);
      toast.error("Payment failed. Please try again.");
    });
    rzp.open();
  } catch (error) {
    console.error("Error in checkoutRazorPay:", error);
    toast.error("Something went wrong during the payment process.");
  }
};
