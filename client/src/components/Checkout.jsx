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
      theme: { color: "#8B5CF6" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-purple-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-serif text-center text-gray-800 mb-8 tracking-wide">
          🛒 Elegant Checkout
        </h1>

        {/* 📍 Address Form */}
        {!isAddressSaved ? (
          <div className="mb-8">
            <h2 className="text-xl font-serif text-gray-700 mb-4 border-b pb-2">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg font-serif text-gray-700 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 focus:outline-none transition"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm font-serif mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg font-serif text-gray-700 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 focus:outline-none transition"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm font-serif mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg font-serif text-gray-700 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 focus:outline-none transition"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm font-serif mt-1">
                    {errors.street}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg font-serif text-gray-700 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 focus:outline-none transition"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm font-serif mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg font-serif text-gray-700 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 focus:outline-none transition"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm font-serif mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveAddress}
              className="w-full mt-6 py-3 text-lg font-serif text-white bg-green-600 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              📍 Save Address
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-serif text-gray-700 mb-3 border-b pb-2">
              Shipping Address
            </h2>
            <p className="text-gray-800 font-serif leading-relaxed">
              {address.fullName}, {address.street}, {address.city} -{" "}
              {address.pincode}
            </p>
            <p className="text-gray-600 font-serif mt-2">📞 {address.phone}</p>
          </div>
        )}

        {/* 💰 Total Amount */}
        <div className="text-center mb-6">
          <p className="text-lg font-serif text-gray-800">
            Total Amount:{" "}
            <span className="text-purple-600 font-bold text-xl">
              ₹{totalAmount}
            </span>
          </p>
        </div>

        {/* Secure Payment Badge */}
        <div className="flex justify-center items-center gap-2 text-green-600 font-serif mb-6 bg-green-50 py-2 px-4 rounded-lg border border-green-100">
          <span className="text-lg">✅</span> Secure Payment with Razorpay
        </div>

        {/* 🚀 Payment Button */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handlePayment}
            className={`w-full py-3 text-lg font-serif text-white bg-purple-600 rounded-lg shadow-lg 
            hover:bg-purple-700 transition ${
              !isAddressSaved && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isAddressSaved}
          >
            💳 Pay Now
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 text-lg font-serif text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition border border-gray-300"
          >
            ⬅️ Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
