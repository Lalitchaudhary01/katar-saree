import React from "react";
import { useNavigate } from "react-router-dom";

const silkSareesData = [
  {
    id: 1,
    name: "Royal Blue Kanjivaram Silk Saree",
    image: "/images/silk1.jpg",
    price: "₹12,999",
  },
  {
    id: 2,
    name: "Golden Banarasi Silk Saree",
    image: "/images/silk2.jpg",
    price: "₹9,499",
  },
  {
    id: 3,
    name: "Maroon Pure Silk Saree",
    image: "/images/silk3.jpg",
    price: "₹7,999",
  },
];

const SilkSaree = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Silk Sarees Collection
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {silkSareesData.map((saree) => (
          <div
            key={saree.id}
            className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            onClick={() => navigate(`/saree/${saree.id}`)}
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
              <button
                className="mt-4 w-full bg-[#c98a5e] text-white py-2 px-4 rounded-lg hover:bg-[#a86f4e]"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/buy/${saree.id}`);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SilkSaree;
