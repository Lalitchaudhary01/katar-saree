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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-md shadow-xl font-sans">
      <h1 className="text-4xl font-[Garamond] mb-8 text-center text-gray-800 tracking-wider border-b border-gray-200 pb-4">
        SHOPPING BAG
        {totalItems > 0 && (
          <span className="ml-3 bg-black text-white text-sm px-3 py-1 rounded-sm">
            {totalItems}
          </span>
        )}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <p className="text-xl font-light mb-8 text-gray-600">
            Your shopping bag is empty
          </p>
          <a
            href="/"
            className="mt-4 bg-black text-white px-10 py-3 hover:bg-gray-900 transition-all duration-300 tracking-widest text-sm font-light"
          >
            CONTINUE SHOPPING
          </a>
        </div>
      ) : (
        <div className="bg-white">
          <ul className="divide-y divide-gray-100">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-8"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-40 object-cover"
                />
                <div className="flex-1 ml-8">
                  <h2 className="text-lg font-medium text-gray-800 tracking-wide">
                    {item.title}
                  </h2>
                  <p className="text-lg font-light mt-1">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(item.price))}
                  </p>
                  <div className="flex mt-4 text-gray-500 text-sm space-x-6">
                    {item.size && (
                      <p className="font-light">
                        Size: <span className="text-gray-700">{item.size}</span>
                      </p>
                    )}
                    {item.color && (
                      <p className="font-light">
                        Color:{" "}
                        <span className="text-gray-700">{item.color}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center mt-4">
                    <p className="text-sm font-light text-gray-500 mr-4">
                      QUANTITY
                    </p>
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="px-3 py-1 border-r border-gray-200 hover:bg-gray-50"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <Minus
                          size={16}
                          className={
                            (item.quantity || 1) <= 1
                              ? "text-gray-300"
                              : "text-gray-600"
                          }
                        />
                      </button>
                      <span className="px-4 py-1 text-gray-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="px-3 py-1 border-l border-gray-200 hover:bg-gray-50"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium mt-4 text-gray-800">
                    Item Total:{" "}
                    <span className="text-gray-900">
                      {selectedCurrency.symbol}
                      {formatPrice(
                        convertPrice(item.price * (item.quantity || 1))
                      )}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 hover:text-gray-500 transition-all duration-300"
                >
                  <Trash2 size={20} className="text-gray-800" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-light text-gray-500">SUBTOTAL</p>
                  <span className="ml-8 text-lg font-light text-gray-800">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(totalAmount))}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-light text-gray-500">SHIPPING</p>
                  <span className="ml-8 text-lg font-light text-gray-800">
                    FREE
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-800">TOTAL</p>
                  <span className="ml-8 text-2xl font-light text-gray-800">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(totalAmount))}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-black text-white w-full md:w-auto px-10 py-4 hover:bg-gray-900 transition-all duration-300 tracking-widest text-sm font-light"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
