import React from "react";

const TrendingSection = () => {
  const categories = [
    {
      id: 1,
      name: "Budget Friendly",
      image: "/api/placeholder/180/180",
      alt: "Budget Friendly Collection",
    },
    {
      id: 2,
      name: "Best Seller",
      image: "/api/placeholder/180/180",
      alt: "Best Seller Collection",
    },
    {
      id: 3,
      name: "New Arrivals",
      image: "/api/placeholder/180/180",
      alt: "New Arrivals Collection",
    },
    {
      id: 4,
      name: "Kurti Kamra",
      image: "/api/placeholder/180/180",
      alt: "Kurti Kamra Collection",
    },
    {
      id: 5,
      name: "Crop Top / Lehanga",
      image: "/api/placeholder/180/180",
      alt: "Crop Top / Lehanga Collection",
    },
    {
      id: 6,
      name: "Kids Collection",
      image: "/api/placeholder/180/180",
      alt: "Kids Collection",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Trending Collections</h2>
        <p className="text-gray-600">Discover our most popular categories</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative rounded-full overflow-hidden border-2 border-gray-200 mb-3 w-36 h-36 transition-all duration-300 ">
              <img
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            <h3 className="text-sm font-medium text-center">{category.name}</h3>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-black-400 transition-all duration-300">
          View All Collections
        </button>
      </div>
    </div>
  );
};

export default TrendingSection;
