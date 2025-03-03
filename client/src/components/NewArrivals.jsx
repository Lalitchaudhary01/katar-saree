import React from "react";

const sarees = [
  {
    name: "Banarasi Silk Saree",
    description: "Hand-woven silk with gold zari",
    price: "₹12,999",
    category: "Silk Saree",
  },
  {
    name: "Kanchipuram Silk Saree",
    description: "Pure silk with temple border",
    price: "₹15,499",
    category: "Kanchipuram Saree",
  },
  {
    name: "Designer Organza Saree",
    description: "Floral embroidery with sequins",
    price: "₹9,799",
    category: "Organza Saree",
  },
  {
    name: "Premium Linen Saree",
    description: "Handloom with silver zari border",
    price: "₹8,499",
    category: "Linen Saree",
  },
];

const NewArrivals = () => {
  return (
    <div className="bg-[#FAF3E0] py-12 px-6">
      <h2 className="text-3xl font-semibold text-center text-[#4A2C2A] mb-6">
        New Arrivals
      </h2>
      <p className="text-center text-[#6D4C41] mb-8">
        Discover our latest collection of exquisite sarees, crafted with
        precision and adorned with intricate details.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sarees.map((saree, index) => (
          <div key={index} className="bg-[#EFE5DC] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#4A2C2A]">
              {saree.category}
            </h3>
            <p className="text-sm text-[#6D4C41] mt-2">{saree.name}</p>
            <p className="text-sm text-[#6D4C41] mt-1">{saree.description}</p>
            <p className="text-lg font-bold text-[#D4A373] mt-3">
              {saree.price}
            </p>
            <button className="mt-4 px-4 py-2 bg-[#D4A373] text-white rounded-lg hover:bg-[#B8865C]">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-[#A67651] text-white rounded-lg hover:bg-[#7C4E32]">
          View All New Arrivals
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
