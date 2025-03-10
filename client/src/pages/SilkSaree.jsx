import React from "react";
import { useNavigate } from "react-router-dom";
import silkSareesData from "../assets/product/SilkSaree";
import { useCart } from "../context/CartContext";

const SilkSaree = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e, saree) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    addToCart(saree);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Silk Sarees Collection
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {silkSareesData.map((saree, index) => (
          <div
            key={saree.id}
            className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            onClick={() => navigate(`/collection/${saree.id}`)}
          >
            <img
              src={saree.image}
              alt={saree.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {saree.name}
              </h2>
              <p className="text-gray-600 mt-2">{saree.price}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-[#c98a5e] text-white py-2 px-4 rounded-lg hover:bg-[#a86f4e]"
                  onClick={(e) => handleAddToCart(e, saree)}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-[#333] text-white py-2 px-4 rounded-lg hover:bg-black"
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
        ))}
      </div>
    </div>
  );
};

export default SilkSaree;
