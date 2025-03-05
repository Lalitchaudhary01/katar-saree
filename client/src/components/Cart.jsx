import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; // Importing the delete icon

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const totalItems = cart.length; // Counting total items
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    navigate("/checkout", { state: { totalAmount } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center relative">
        Your Shopping Cart
        {totalItems > 0 && (
          <span className="ml-2 bg-black text-white text-sm font-semibold px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">Your cart is empty.</p>
          <a
            href="/"
            className="mt-4 inline-block bg-[#c98a5e] text-white px-6 py-2 rounded-lg hover:bg-[#b3744f] transition"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-300">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md shadow-sm"
                />

                {/* Product Details */}
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  <p className="text-gray-500 text-sm">Color: {item.color}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition shadow-md"
                >
                  <Trash2 size={20} className="text-white" />
                </button>
              </li>
            ))}
          </ul>

          {/* Checkout Section */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-800">
              Total: <span className="text-green-600">₹{totalAmount}</span>
            </span>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
