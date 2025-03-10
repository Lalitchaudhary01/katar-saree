import React from "react";
import { useNavigate } from "react-router-dom";
import silkSarees from "../../assets/product/SilkSaree";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

const SilkSaree = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e, saree) => {
    e.stopPropagation();
    addToCart(saree);
  };

  // Format price as Indian currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
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
            perfect for every occasion.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {silkSarees.map((saree) => {
            // Extract only title and price from the data
            const productTitle = silkSarees.title || saree.name;
            const discountPrice = saree.discountPrice || saree.price;
            const originalPrice = saree.originalPrice || saree.oldPrice;

            return (
              <div
                key={saree.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/collection/${saree.id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={saree.images ? saree.images[0] : saree.image}
                    alt={productTitle}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Discount tag */}
                  {saree.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-medium py-1 px-2 rounded">
                      {saree.discount}
                    </div>
                  )}

                  {/* Hover reveal actions */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4">
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
                    {productTitle}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <p className="text-lg font-semibold text-[#c98a5e]">
                      {formatPrice(discountPrice)}
                    </p>
                    {originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {formatPrice(originalPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SilkSaree;
