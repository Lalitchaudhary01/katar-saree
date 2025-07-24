import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCurrency } from "../context/currencyContext";
import { useAuth } from "../context/authContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const { token, isAuthenticated } = useAuth();
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

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

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
    setError(null);
  };

  const getItemPrice = (item) => {
    const itemPrice = item.price || amount;
    return formatPrice(
      item.currency === selectedCurrency.code
        ? itemPrice
        : convertPrice(itemPrice)
    );
  };

  const getItemCurrencySymbol = () => selectedCurrency.symbol;

  const calculateTotal = () => {
    if (cart?.length > 0) {
      return formatPrice(
        cart.reduce((total, item) => {
          const itemPrice = item.price || 0;
          const convertedPrice =
            item.currency === selectedCurrency.code
              ? itemPrice
              : convertPrice(itemPrice);
          return total + convertedPrice * (item.quantity || 1);
        }, 0)
      );
    }
    return formatPrice(convertPrice(amount));
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Validate form data
      const requiredFields = ["name", "email", "phone", "address"];
      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // 2. Calculate amount with complete validation
      const calculateTotalAmount = () => {
        try {
          // Handle cart items
          if (cart?.length > 0) {
            return cart.reduce((total, item) => {
              const price = parseFloat(item?.price) || 0;
              const quantity = parseInt(item?.quantity) || 1;

              if (isNaN(price) || isNaN(quantity)) {
                console.error("Invalid price or quantity:", {
                  price,
                  quantity,
                });
                return total;
              }

              return total + price * quantity;
            }, 0);
          }

          // Handle single product
          const singleAmount = parseFloat(amount || totalAmount || 0);
          return isNaN(singleAmount) ? 0 : singleAmount;
        } catch (err) {
          console.error("Amount calculation error:", err);
          return 0;
        }
      };

      // 3. Get base amount
      let baseAmount = calculateTotalAmount();
      console.log("Base amount:", baseAmount); // Debug log

      // 4. Convert currency if needed
      if (selectedCurrency?.code !== "INR") {
        baseAmount = convertPrice(baseAmount, "INR") || 0;
        console.log("Converted amount:", baseAmount); // Debug log
      }

      // 5. Final validation
      const finalAmount = parseFloat(baseAmount.toFixed(2));
      if (isNaN(finalAmount) || finalAmount <= 0) {
        throw new Error(
          `Invalid order amount (${finalAmount}). Please check your cart items.`
        );
      }

      // 6. Create Razorpay order
      const { data } = await axios.post(
        `${API_BASE_URL}/orders/create-razorpay-order`,
        {
          amount: finalAmount,
          currency: "INR",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 7. Proceed with Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Your Store Name",
        description: "Order Payment",
        handler: async (response) => {
          // Payment verification logic
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Full payment error:", {
        error: err,
        formData,
        cart,
        amount,
        totalAmount,
        selectedCurrency,
      });

      setError(
        err.response?.data?.message ||
          err.message ||
          "Payment processing failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const displayTotal = totalAmount
    ? formatPrice(convertPrice(totalAmount))
    : amount
    ? formatPrice(convertPrice(amount))
    : "0";

  // Add login prompt if not authenticated
  if (step === 3 && !isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-black text-white">
              <h2 className="text-xl font-semibold">Authentication Required</h2>
            </div>
            <div className="p-6 text-center">
              <p className="mb-4">
                You need to login to complete your purchase
              </p>
              <button
                onClick={() =>
                  navigate("/login", { state: { from: location } })
                }
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Checkout Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-black text-white" : "bg-gray-200"
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-sm mt-1 font-medium">
                  {stepNumber === 1
                    ? "Cart"
                    : stepNumber === 2
                    ? "Address"
                    : "Payment"}
                </span>
                {stepNumber < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step > stepNumber ? "bg-black" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
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
              <form onSubmit={handleSubmitAddress} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
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
                      Email *
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
                      Phone Number *
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
                      Pincode *
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
                    Complete Address *
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
                      City *
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
                      State *
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
            )}

            {step === 3 && (
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
                    <h3 className="font-medium text-gray-800">Order Summary</h3>
                  </div>
                  <div className="p-4">
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
                            <span className="font-medium">
                              {getItemCurrencySymbol()}
                              {getItemPrice(item)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {title} × {quantity || 1}
                          </span>
                          <span className="font-medium">
                            {getItemCurrencySymbol()}
                            {formatPrice(convertPrice(amount))}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 space-y-2 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>
                          {getItemCurrencySymbol()}
                          {displayTotal}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between pt-2 text-lg font-bold border-t border-gray-100 mt-2">
                        <span>Total</span>
                        <span className="text-black">
                          {getItemCurrencySymbol()}
                          {displayTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className={`w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 font-medium flex items-center justify-center ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Processing..." : `Pay ${displayTotal}`}
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-white text-gray-800 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-300"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-3 text-sm">We accept</p>
          <div className="flex justify-center space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
              alt="Visa"
              className="h-8 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png"
              alt="Mastercard"
              className="h-8 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/RuPay.svg/1200px-RuPay.svg.png"
              alt="RuPay"
              className="h-8 object-contain"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
              alt="UPI"
              className="h-8 object-contain"
            />
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
