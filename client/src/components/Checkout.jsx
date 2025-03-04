import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Razorpay Dashboard se API key lo
      amount: totalAmount * 100, // Razorpay paise me leta hai (₹100 = 10000)
      currency: "INR",
      name: "Your Shop",
      description: "Purchase",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert(
          `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "Lalit",
        email: "lalit@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Complete Your Payment
      </h1>
      <p className="text-lg text-center">Total Amount: ₹{totalAmount}</p>
      <button
        onClick={handlePayment}
        className="mt-4 bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
