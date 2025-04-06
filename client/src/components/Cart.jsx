import React from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/currencyContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";

const Cart = () => {
  const {
    cart = [],
    loading,
    error,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
    fetchCart,
  } = useCart();

  const navigate = useNavigate();
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();
  const { userInfo } = useSelector((state) => state.auth);

  const totalItems = getCartItemCount();
  const totalAmount = getCartTotal();

  const handleCheckout = () => {
    if (!userInfo) {
      navigate("/auth", { state: { from: "/cart" } });
      return;
    }
    navigate("/checkout", { state: { totalAmount } });
  };

  const handleIncreaseQuantity = (productId, color) => {
    const item = cart.find(
      (item) => item.productId === productId && item.color === color
    );
    if (item) updateQuantity(productId, color, (item.quantity || 1) + 1);
  };

  const handleDecreaseQuantity = (productId, color) => {
    const item = cart.find(
      (item) => item.productId === productId && item.color === color
    );
    if (item) {
      const newQuantity = (item.quantity || 1) - 1;
      if (newQuantity > 0) {
        updateQuantity(productId, color, newQuantity);
      } else {
        removeFromCart(productId, color);
      }
    }
  };

  const handleRetry = () => {
    fetchCart();
  };

  if (loading && cart.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-10 text-center">
        <div className="animate-pulse">Loading your cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-10 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={handleRetry}
          className="bg-black text-white px-4 py-2 hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-10 bg-white rounded-none shadow-xl font-[Garamond]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Garamond] mb-6 md:mb-10 text-center text-black tracking-wider border-b border-gray-200 pb-4 md:pb-6">
        YOUR HERITAGE COLLECTION
        {totalItems > 0 && (
          <span className="ml-2 md:ml-4 bg-black text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-none">
            {totalItems}
          </span>
        )}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-10 md:py-20 flex flex-col items-center">
          <ShoppingBag size={60} className="text-gray-300 mb-4 md:mb-6" />
          <p className="text-xl md:text-2xl font-[Garamond] mb-6 md:mb-10 text-black px-4">
            {userInfo
              ? "Your collection awaits your exquisite taste"
              : "Please sign in to view your cart"}
          </p>
          <a
            href={userInfo ? "/" : "/auth"}
            className="mt-4 md:mt-6 bg-black text-white px-8 sm:px-12 md:px-16 py-3 md:py-4 hover:bg-gray-900 transition-all duration-300 tracking-widest text-xs sm:text-sm font-[Garamond]"
          >
            {userInfo ? "EXPLORE OUR COLLECTION" : "SIGN IN"}
          </a>
        </div>
      ) : (
        <div className="bg-white">
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li
                key={`${item.productId}-${item.color}-${index}`}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 sm:py-8 md:py-12 space-y-4 sm:space-y-0"
              >
                <div className="relative mx-auto sm:mx-0">
                  <img
                    src={item.image || "/placeholder-product.jpg"}
                    alt={item.name}
                    className="w-32 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 object-cover border border-gray-100"
                    onError={(e) => {
                      e.target.src = "/placeholder-product.jpg";
                    }}
                  />
                  <div className="absolute inset-0 border border-gray-200 opacity-30"></div>
                </div>
                <div className="flex-1 w-full sm:ml-6 md:ml-12">
                  <h2 className="text-lg sm:text-xl font-[Garamond] text-black tracking-wide">
                    {item.name || "Unnamed Product"}
                  </h2>
                  <p className="text-lg sm:text-xl font-[Garamond] mt-1 sm:mt-2 text-black">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(item.price || 0))}
                  </p>
                  <div className="flex mt-3 md:mt-6 text-black text-xs sm:text-sm space-x-4 sm:space-x-10">
                    {item.color && (
                      <p className="font-[Garamond]">
                        Color: <span className="text-black">{item.color}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center mt-3 md:mt-6">
                    <p className="text-xs sm:text-sm font-[Garamond] text-black mr-2 sm:mr-4">
                      QUANTITY
                    </p>
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() =>
                          handleDecreaseQuantity(item.productId, item.color)
                        }
                        className="px-2 sm:px-3 py-1 border-r border-gray-300 hover:bg-gray-50"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <Minus
                          size={14}
                          className={
                            (item.quantity || 1) <= 1
                              ? "text-gray-300"
                              : "text-black"
                          }
                        />
                      </button>
                      <span className="px-3 sm:px-6 py-1 text-black">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          handleIncreaseQuantity(item.productId, item.color)
                        }
                        className="px-2 sm:px-3 py-1 border-l border-gray-300 hover:bg-gray-50"
                      >
                        <Plus size={14} className="text-black" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.color)}
                      className="ml-auto p-2 sm:p-3 hover:text-gray-500 transition-all duration-300"
                      aria-label="Remove item"
                      disabled={loading}
                    >
                      <Trash2 size={18} className="text-black" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-[Garamond] mt-3 md:mt-6 text-black">
                    Item Total:{" "}
                    <span className="text-black font-medium">
                      {selectedCurrency.symbol}
                      {formatPrice(
                        convertPrice((item.price || 0) * (item.quantity || 1))
                      )}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 md:pt-12 border-t border-gray-200">
            <div className="flex flex-col space-y-6 md:space-y-0">
              <div className="space-y-3 bg-gray-50 p-4 sm:p-6 md:p-8 w-full">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <p className="text-xs sm:text-sm font-[Garamond] text-black">
                    SUBTOTAL
                  </p>
                  <span className="ml-4 sm:ml-20 text-base sm:text-lg font-[Garamond] text-black">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(totalAmount))}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <p className="text-xs sm:text-sm font-[Garamond] text-black">
                    SHIPPING
                  </p>
                  <span className="ml-4 sm:ml-20 text-base sm:text-lg font-[Garamond] text-black">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                  <p className="text-xs sm:text-sm font-[Garamond] font-medium text-black">
                    TOTAL
                  </p>
                  <span className="ml-4 sm:ml-20 text-xl sm:text-2xl font-[Garamond] text-black">
                    {selectedCurrency.symbol}
                    {formatPrice(convertPrice(totalAmount))}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-black text-white w-full px-4 py-3 sm:py-4 hover:bg-gray-900 transition-all duration-300 tracking-widest text-xs sm:text-sm font-[Garamond]"
                disabled={loading || cart.length === 0}
              >
                {loading ? "PROCESSING..." : "COMPLETE YOUR PURCHASE"}
              </button>
            </div>
            <p className="text-center text-xs text-black mt-6 sm:mt-10 font-[Garamond] tracking-wider px-4">
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
