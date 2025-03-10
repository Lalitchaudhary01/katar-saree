import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import silkSareesData from "../assets/product/SilkSaree";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingBag } from "lucide-react";

const SilkSaree = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

  const handleAddToCart = (e, saree) => {
    e.stopPropagation();
    addToCart(saree);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            Elegant Silk Sarees
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted silk sarees,
            perfect for every occasion. Each piece tells a story of tradition
            and craftsmanship.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="text-gray-700 hover:text-[#c98a5e]">
              Newest
            </button>
            <button className="text-gray-700 hover:text-[#c98a5e]">
              Popular
            </button>
            <button className="text-gray-700 hover:text-[#c98a5e]">
              Price
            </button>
          </div>
          <div>
            <span className="text-gray-700">
              {silkSareesData.length} products
            </span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {silkSareesData.map((saree) => (
            <div
              key={saree.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredId(saree.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/collection/${saree.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={saree.image}
                  alt={saree.name}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Quick action buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add wishlist functionality
                    }}
                  >
                    <Heart size={20} className="text-gray-700" />
                  </button>
                </div>

                {/* Hover reveal actions */}
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 transform transition-transform duration-300 ${
                    hoveredId === saree.id
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                >
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-[#c98a5e] text-white py-2 px-4 rounded hover:bg-[#a86f4e] transition-colors flex items-center justify-center gap-2"
                      onClick={(e) => handleAddToCart(e, saree)}
                    >
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                    <button
                      className="flex-1 bg-gray-800 text-white py-2 px-4 rounded hover:bg-black transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/checkout?productId=${saree.id}`);
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-800 mb-1">
                  {saree.name}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-[#c98a5e]">
                    {saree.price}
                  </p>
                  {saree.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      {saree.originalPrice}
                    </p>
                  )}
                </div>
                {saree.rating && (
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(saree.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      ({saree.reviews || 0} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SilkSaree;
