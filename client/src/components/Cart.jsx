import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const totalItems = cart.length;
  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    navigate("/checkout", { state: { totalAmount } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#FAF3E0] rounded-lg shadow-lg font-serif">
      <h1 className="text-3xl font-bold mb-6 text-center relative text-[#8B6A37]">
        Your Shopping Cart
        {totalItems > 0 && (
          <span className="ml-2 bg-[#8B6A37] text-white text-sm font-semibold px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-700 py-12">
          <p className="text-lg mb-6">Your cart is empty.</p>
          <a
            href="/"
            className="mt-4 inline-block bg-[#8B6A37] text-white px-6 py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300 tracking-wider"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-sm shadow-md border border-[#8B6A37] border-opacity-20">
          <ul className="divide-y divide-[#8B6A37] divide-opacity-20">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-6"
              >
                {/* Product Image */}
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-12 h-12 border-l border-t border-[#8B6A37] border-opacity-40"></div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-sm shadow-sm relative z-10"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r border-b border-[#8B6A37] border-opacity-40"></div>
                </div>

                {/* Product Details */}
                <div className="flex-1 ml-6">
                  <h2 className="text-lg font-semibold text-[#8B6A37]">
                    {item.title}
                  </h2>
                  <p className="text-[#bd7e1f] font-semibold">₹{item.price}</p>
                  <div className="flex mt-2 text-gray-600 text-sm">
                    <p className="mr-4">
                      Size: <span className="font-semibold">{item.size}</span>
                    </p>
                    <p>
                      Color: <span className="font-semibold">{item.color}</span>
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-sm bg-[#8B6A37] hover:bg-opacity-90 transition-all duration-300"
                >
                  <Trash2 size={20} className="text-white" />
                </button>
              </li>
            ))}
          </ul>

          {/* Checkout Section */}
          <div className="mt-8 pt-6 border-t border-[#8B6A37] border-opacity-20">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-[#8B6A37]">
                Total: <span className="text-[#bd7e1f]">₹{totalAmount}</span>
              </span>
              <button
                onClick={handleCheckout}
                className="bg-[#8B6A37] text-white px-8 py-3 rounded-sm hover:bg-opacity-90 transition-all duration-300 tracking-wider"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
