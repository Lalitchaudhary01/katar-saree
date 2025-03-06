import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const totalAmount = location.state?.totalAmount || 0;

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  // 🛑 Validate Form Inputs
  const validateForm = () => {
    let newErrors = {};
    if (!address.fullName) newErrors.fullName = "Full Name is required";
    if (!address.phone || address.phone.length !== 10)
      newErrors.phone = "Valid Phone is required";
    if (!address.street) newErrors.street = "Street Address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.pincode || address.pincode.length !== 6)
      newErrors.pincode = "Valid Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 📝 Save Address
  const handleSaveAddress = () => {
    if (validateForm()) {
      setIsAddressSaved(true);
    }
  };

  // 💳 Handle Payment
  const handlePayment = () => {
    if (!isAddressSaved) {
      alert("❗ Please save your address before proceeding.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Your Shop",
      description: "Purchase",
      handler: function (response) {
        alert(
          `🎉 Payment Successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: address.fullName,
        email: "user@example.com",
        contact: address.phone,
      },
      theme: { color: "#6366f1" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-indigo-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-2xl animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          🛒 Secure Checkout
        </h1>

        {/* 📍 Address Form */}
        {!isAddressSaved ? (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Shipping Address
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}

              <input
                type="text"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}

              <input
                type="text"
                placeholder="Street Address"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street}</p>
              )}

              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}

              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) =>
                  setAddress({ ...address, pincode: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm">{errors.pincode}</p>
              )}
            </div>

            <button
              onClick={handleSaveAddress}
              className="w-full mt-4 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              📍 Save Address
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              Shipping Address
            </h2>
            <p className="text-gray-800">
              {address.fullName}, {address.street}, {address.city} -{" "}
              {address.pincode}
            </p>
            <p className="text-gray-600">📞 {address.phone}</p>
          </div>
        )}

        {/* 💰 Total Amount */}
        <p className="text-lg font-medium text-gray-800 text-center mb-4">
          Total Amount:{" "}
          <span className="text-indigo-600 font-bold">₹{totalAmount}</span>
        </p>

        {/* Secure Payment Badge */}
        <div className="flex justify-center items-center gap-2 text-green-600 font-semibold text-sm mb-4">
          <span className="text-lg">✅</span> Secure Payment with Razorpay
        </div>

        {/* 🚀 Payment Button */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handlePayment}
            className={`w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg 
            hover:bg-indigo-700 transition ${
              !isAddressSaved && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isAddressSaved}
          >
            💳 Pay Now
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 text-lg font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            ⬅️ Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
