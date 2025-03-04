import React, { useState, useEffect } from "react";
import collections from "../assets/product/CollectionData";

const FeaturedCollections = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState(
    collections.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        collections.forEach((collection, index) => {
          newIndexes[index] =
            (prevIndexes[index] + 1) % collection.images.length;
        });
        return newIndexes;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = (index) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [index]: (prev[index] + 1) % collections[index].images.length,
    }));
  };

  const handlePrev = (index) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [index]:
        prev[index] === 0
          ? collections[index].images.length - 1
          : prev[index] - 1,
    }));
  };

  return (
    <section className="py-16 md:py-24 bg-primary bg-opacity-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#8B6A37] mb-3">
          Featured Collections
        </h2>
        <p className="text-[#6B4F27] max-w-2xl mx-auto mb-6">
          Explore our curated selection of premium handcrafted pieces, each
          telling a story of heritage and artistry.
        </p>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {collections
          .slice(0, showAll ? collections.length : 4)
          .map((collection, index) => (
            <div
              key={index}
              className="group w-64 overflow-hidden shadow-lg rounded-xl bg-white border border-[#E0C097] transition-transform transform hover:scale-105 flex flex-col justify-between"
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.images[currentIndexes[index]]}
                  alt={collection.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  onClick={() => handlePrev(index)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full"
                >
                  <span className="text-[#D4AF37] text-2xl">◀</span>
                </button>
                <button
                  onClick={() => handleNext(index)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full"
                >
                  <span className="text-[#D4AF37] text-2xl">▶</span>
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl text-[#8B6A37] font-semibold mb-2">
                  {collection.title}
                </h3>
                <p className="text-[#6B4F27] text-sm flex-grow">
                  {collection.desc}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button className="text-[#D4AF37] hover:text-red-500 transition-colors">
                    ❤️
                  </button>
                  <button className="text-[#D4AF37] hover:text-green-500 transition-colors">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-16 text-center">
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="bg-[#D4AF37] text-white px-8 py-3 rounded hover:bg-[#B8860B] transition-all"
          >
            Explore All Collections
          </button>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollections;
