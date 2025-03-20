import React from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();

  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const totalAmount = cart.reduce(
    (total, item) => total + convertPrice(item.price) * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { totalAmount } });
  };

  const handleIncreaseQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item) updateQuantity(itemId, (item.quantity || 1) + 1);
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item && (item.quantity || 1) > 1)
      updateQuantity(itemId, (item.quantity || 1) - 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-10 bg-white rounded-none shadow-xl font-[Garamond]">
      <h1 className="text-5xl font-[Garamond] mb-10 text-center text-black tracking-wider border-b border-gray-200 pb-6">
        YOUR HERITAGE COLLECTION
        {totalItems > 0 && (
          <span className="ml-4 bg-black text-white text-sm px-3 py-1 rounded-none">
            {totalItems}
          </span>
        )}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <ShoppingBag size={80} className="text-gray-300 mb-6" />
          <p className="text-2xl font-[Garamond] mb-10 text-black">
            Your collection awaits your exquisite taste
          </p>
          <a
            href="/"
            className="mt-6 bg-black text-white px-16 py-4 hover:bg-gray-900 transition-all duration-300 tracking-widest text-sm font-[Garamond]"
          >
            EXPLORE OUR COLLECTION
          </a>
        </div>
      ) : (
        <div className="bg-white">
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-12"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-40 h-52 object-cover border border-gray-100"
                  />
                  <div className="absolute inset-0 border border-gray-200 opacity-30"></div>
                </div>
                <div className="flex-1 ml-12">
                  <h2 className="text-xl font-[Garamond] text-black tracking-wide">
                    {item.title}
                  </h2>
                  <p className="text-xl font-[Garamond] mt-2 text-black">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(item.price))}
                  </p>
                  <div className="flex mt-6 text-black text-sm space-x-10">
                    {item.size && (
                      <p className="font-[Garamond]">
                        Size: <span className="text-black">{item.size}</span>
                      </p>
                    )}
                    {item.color && (
                      <p className="font-[Garamond]">
                        Color: <span className="text-black">{item.color}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center mt-6">
                    <p className="text-sm font-[Garamond] text-black mr-4">
                      QUANTITY
                    </p>
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="px-3 py-1 border-r border-gray-300 hover:bg-gray-50"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <Minus
                          size={16}
                          className={
                            (item.quantity || 1) <= 1
                              ? "text-gray-300"
                              : "text-black"
                          }
                        />
                      </button>
                      <span className="px-6 py-1 text-black">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="px-3 py-1 border-l border-gray-300 hover:bg-gray-50"
                      >
                        <Plus size={16} className="text-black" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-[Garamond] mt-6 text-black">
                    Item Total:{" "}
                    <span className="text-black font-medium">
                      {selectedCurrency.symbol}
                      {formatPrice(
                        convertPrice(item.price * (item.quantity || 1))
                      )}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 hover:text-gray-500 transition-all duration-300"
                >
                  <Trash2 size={20} className="text-black" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
              <div className="space-y-4 bg-gray-50 p-8 w-full md:w-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-[Garamond] text-black">SUBTOTAL</p>
                  <span className="ml-20 text-lg font-[Garamond] text-black">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(totalAmount))}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-[Garamond] text-black">SHIPPING</p>
                  <span className="ml-20 text-lg font-[Garamond] text-black">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm font-[Garamond] font-medium text-black">
                    TOTAL
                  </p>
                  <span className="ml-20 text-2xl font-[Garamond] text-black">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(totalAmount))}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-black text-white w-full md:w-auto px-16 py-4 hover:bg-gray-900 transition-all duration-300 tracking-widest text-sm font-[Garamond]"
              >
                COMPLETE YOUR PURCHASE
              </button>
            </div>
            <p className="text-center text-xs text-black mt-10 font-[Garamond] tracking-wider">
              Each piece is handcrafted with heritage artisanship and delivered
              with the utmost care
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
