import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaShoppingCart, FaTrash, FaArrowLeft } from "react-icons/fa";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      title: item.title,
      image: item.image || item.images[0],
      price: item.discountPrice,
      color: item.colors ? item.colors[0] : null,
      quantity: 1,
      stock: item.stock,
      specialty: item.specialty,
    };

    addToCart(cartItem);
    toast.success(`${item.title} added to your cart!`);
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-8">
          <button
            className="mr-4 text-gray-600 hover:text-black"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="ml-3 text-sm bg-gray-200 px-2 py-1 rounded-full">
            {wishlistItems.length} items
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-gray-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Items added to your wishlist will appear here. Start shopping to
              add items you love!
            </p>
            <button
              onClick={() => navigate("/collection")}
              className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition"
            >
              Browse Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.title}
                    className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                    onClick={() => navigate(`/collection/${item.id}`)}
                  />
                  <button
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <FaTrash className="text-red-500 text-sm" />
                  </button>
                </div>
                <div className="p-4">
                  <h3
                    className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                    onClick={() => navigate(`/collection/${item.id}`)}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-gray-900">
                        ₹{item.discountPrice}
                      </span>
                      {item.originalPrice > item.discountPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-black text-white py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition flex items-center justify-center gap-1"
                    >
                      <FaShoppingCart className="text-xs" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/collection/${item.id}`)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm hover:border-gray-600 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
