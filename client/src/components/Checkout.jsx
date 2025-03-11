import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cart = [],
    totalAmount,
    image,
    title,
    quantity,
    color,
    amount,
  } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "razorpay",
  });

  const [step, setStep] = useState(1); // 1 for checkout, 2 for address, 3 for payment confirmation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePayment = () => {
    // Calculate final amount (in paise for RazorPay)
    const finalAmount = ((totalAmount || amount) * 100).toFixed(0);

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay key
      amount: finalAmount,
      currency: "INR",
      name: "Your Store Name",
      description: "Payment for your order",
      handler: function (response) {
        // Handle successful payment
        alert(
          "Payment Successful! Payment ID: " + response.razorpay_payment_id
        );
        navigate("/order-confirmation", {
          state: {
            orderId: response.razorpay_payment_id,
            items:
              cart.length > 0
                ? cart
                : [{ image, title, quantity, color, amount }],
            amount: totalAmount || amount,
            address: formData,
          },
        });
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#000000",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#FAF3E0] rounded-lg shadow-lg">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

          {/* Show cart items or single product */}
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex gap-4 bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-sm"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>
                      Color:{" "}
                      <span
                        className="inline-block w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </p>
                    <p className="text-lg font-bold">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : image && title ? (
            <div className="border rounded-lg p-4 flex gap-4 bg-white">
              <img
                src={image}
                alt={title}
                className="w-24 h-24 object-cover rounded-sm"
              />
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p>Quantity: {quantity || 1}</p>
                <p>
                  Color:{" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color }}
                  ></span>
                </p>
                <p className="text-lg font-bold">₹{amount}</p>
              </div>
            </div>
          ) : null}

          {/* Total Amount & Continue to Address Button */}
          <div className="mt-6 pt-4 border-t border-gray-300">
            <h3 className="text-xl font-bold text-center">
              Total Amount: ₹{totalAmount || amount}
            </h3>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-black text-white px-6 py-3 mt-4 rounded-md hover:bg-opacity-90"
            >
              Continue to Address
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Shipping Details
          </h2>

          <form onSubmit={handleSubmitAddress} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Complete Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Payment Method
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === "razorpay"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  RazorPay
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-opacity-90"
              >
                Proceed to Payment
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mt-2 border border-black px-6 py-2 rounded-md"
              >
                Back to Cart
              </button>
            </div>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>

          <div className="bg-white p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
            <p>{formData.name}</p>
            <p>{formData.address}</p>
            <p>
              {formData.city}, {formData.state} - {formData.pincode}
            </p>
            <p>Phone: {formData.phone}</p>
          </div>

          <div className="bg-white p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-lg mb-2">Order Details</h3>
            <p className="font-bold">Total Amount: ₹{totalAmount || amount}</p>
            <p>Payment Method: RazorPay</p>
          </div>

          <div className="mt-6">
            <button
              onClick={handlePayment}
              className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-opacity-90"
            >
              Pay Now
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full mt-2 border border-black px-6 py-2 rounded-md"
            >
              Edit Details
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
