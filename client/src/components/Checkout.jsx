import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCurrency } from "../context/currencyContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
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

  // Function to convert price based on the item's original currency and the currently selected currency
  const getItemPrice = (item) => {
    // If the item has a stored price, use that, otherwise use the provided amount
    const itemPrice = item.price || amount;

    // If the item already has the current currency, no conversion needed
    if (item.currency === selectedCurrency.code) {
      return formatPrice(itemPrice);
    }

    // Convert price from item's currency (assumed INR if not specified) to selected currency
    return formatPrice(convertPrice(itemPrice));
  };

  // Function to get the correct currency symbol for an item
  const getItemCurrencySymbol = () => {
    // Always use the currently selected currency symbol
    return selectedCurrency.symbol;
  };

  // Calculate the total in the selected currency
  const calculateTotal = () => {
    if (cart && cart.length > 0) {
      // If we have a cart with multiple items
      return formatPrice(
        cart.reduce((total, item) => {
          const itemPrice = item.price || 0;
          // Convert each item's price if needed
          const convertedPrice = convertPrice(itemPrice);
          return total + convertedPrice * (item.quantity || 1);
        }, 0)
      );
    } else {
      // Single item case
      return formatPrice(convertPrice(amount));
    }
  };

  const handlePayment = () => {
    // Calculate final amount (in paise for RazorPay)
    // For Razorpay, we need to convert everything to INR
    let finalAmountInINR;

    if (cart && cart.length > 0) {
      // Calculate the sum of all items in INR
      finalAmountInINR = cart.reduce((total, item) => {
        // First get the price in the selected currency
        const itemPriceInSelectedCurrency = item.price || 0;
        // If selected currency is INR, no conversion needed
        if (selectedCurrency.code === "INR") {
          return total + itemPriceInSelectedCurrency * (item.quantity || 1);
        }
        // If selected currency is not INR, convert back to INR for Razorpay
        // We need to divide by the conversion rate to go back to INR
        const conversionRateToINR = 1 / convertPrice(1, "INR");
        return (
          total +
          itemPriceInSelectedCurrency *
            conversionRateToINR *
            (item.quantity || 1)
        );
      }, 0);
    } else {
      // Single item case
      if (selectedCurrency.code === "INR") {
        finalAmountInINR = amount;
      } else {
        // Convert back to INR for Razorpay
        const conversionRateToINR = 1 / convertPrice(1, "INR");
        finalAmountInINR = amount * conversionRateToINR;
      }
    }

    // Convert to paise for Razorpay (smallest currency unit)
    const finalAmount = (finalAmountInINR * 100).toFixed(0);

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay key
      amount: finalAmount,
      currency: "INR", // Razorpay might require INR
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
            amount: calculateTotal(),
            currency: selectedCurrency,
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
        color: "#000000", // Black color theme for Razorpay
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  // Get total amount in current currency for display
  const displayTotal = totalAmount
    ? formatPrice(convertPrice(totalAmount))
    : amount
    ? formatPrice(convertPrice(amount))
    : "0";

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        {/* Checkout Progress Bar */}
        <div className="mb-8 px-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="text-sm mt-1 font-medium">Cart</span>
            </div>
            <div
              className={`h-1 flex-1 mx-2 ${
                step >= 2 ? "bg-black" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="text-sm mt-1 font-medium">Address</span>
            </div>
            <div
              className={`h-1 flex-1 mx-2 ${
                step >= 3 ? "bg-black" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-1 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-black text-white">
            <h2 className="text-xl font-semibold">
              {step === 1
                ? "Your Shopping Cart"
                : step === 2
                ? "Shipping Information"
                : "Review & Payment"}
            </h2>
          </div>

          <div className="p-6">
            {step === 1 && (
              <>
                {/* Show cart items or single product */}
                {cart.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 flex gap-4 hover:border-gray-400 transition duration-300"
                      >
                        <div className="bg-gray-50 p-2 rounded-md">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-800">
                            {item.title}
                          </h3>
                          <div className="mt-1 text-sm text-gray-500 flex items-center gap-4">
                            <p>Qty: {item.quantity || 1}</p>
                            <p className="flex items-center">
                              Color:{" "}
                              <span
                                className="ml-1 inline-block w-4 h-4 rounded-full border"
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </p>
                          </div>
                          <p className="mt-2 text-lg font-semibold text-black">
                            {getItemCurrencySymbol()}
                            {getItemPrice(item)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : image && title ? (
                  <div className="border border-gray-200 rounded-lg p-4 flex gap-4 mb-6 hover:border-gray-400 transition duration-300">
                    <div className="bg-gray-50 p-2 rounded-md">
                      <img
                        src={image}
                        alt={title}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">
                        {title}
                      </h3>
                      <div className="mt-1 text-sm text-gray-500 flex items-center gap-4">
                        <p>Qty: {quantity || 1}</p>
                        <p className="flex items-center">
                          Color:{" "}
                          <span
                            className="ml-1 inline-block w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color }}
                          ></span>
                        </p>
                      </div>
                      <p className="mt-2 text-lg font-semibold text-black">
                        {getItemCurrencySymbol()}
                        {formatPrice(convertPrice(amount))}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Total Amount & Continue to Address Button */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-lg font-semibold mb-4">
                    <span>Subtotal:</span>
                    <span>
                      {getItemCurrencySymbol()}
                      {displayTotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold mb-4">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold mt-2 pt-2 border-t border-gray-100">
                    <span>Total:</span>
                    <span className="text-black">
                      {getItemCurrencySymbol()}
                      {displayTotal}
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-black text-white px-6 py-3 mt-6 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <form onSubmit={handleSubmitAddress} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition"
                        placeholder="98765 43210"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition"
                        placeholder="400001"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complete Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition"
                      rows="3"
                      placeholder="Flat no., Building name, Street, Locality"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition"
                        placeholder="Mumbai"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition"
                        placeholder="Maharashtra"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="razorpay"
                          checked={formData.paymentMethod === "razorpay"}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-black"
                        />
                        <div className="ml-3">
                          <span className="font-medium text-gray-800">
                            RazorPay
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            Pay securely with credit/debit card, UPI or net
                            banking
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
                    >
                      Continue to Payment
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full bg-white text-gray-800 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-300"
                    >
                      Back to Cart
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3">
                      Shipping Address
                    </h3>
                    <div className="text-gray-600">
                      <p className="font-medium">{formData.name}</p>
                      <p>{formData.address}</p>
                      <p>
                        {formData.city}, {formData.state} - {formData.pincode}
                      </p>
                      <p className="mt-1">Phone: {formData.phone}</p>
                      <p>Email: {formData.email}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium text-gray-800">
                        Order Summary
                      </h3>
                    </div>
                    <div className="p-4">
                      {/* Item list summary */}
                      <div className="space-y-2 mb-4">
                        {cart.length > 0 ? (
                          cart.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600">
                                {item.title} × {item.quantity || 1}
                              </span>
                              <span className="font-medium">{item.price}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {title} × {quantity || 1}
                            </span>
                            <span className="font-medium">{amount}</span>
                          </div>
                        )}
                      </div>

                      {/* Price breakdown */}
                      <div className="pt-3 space-y-2 border-t border-gray-100">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>{totalAmount || amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between pt-2 text-lg font-bold border-t border-gray-100 mt-2">
                          <span>Total</span>
                          <span className="text-black">
                            {totalAmount || amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handlePayment}
                      className="w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium flex items-center justify-center"
                    >
                      <span>Pay {totalAmount || amount}</span>
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-white text-gray-800 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-300"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-3 text-sm">We accept</p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white p-2 rounded-md shadow-sm">
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="bg-white p-2 rounded-md shadow-sm">
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Secure payment processing | 100% Purchase Protection
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
