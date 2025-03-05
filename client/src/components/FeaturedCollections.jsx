import React, { useState, useEffect } from "react";
import collections from "../assets/product/CollectionData";
// import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
// import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeaturedCollections = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState(
    collections.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  // const [selectedCollection, setSelectedCollection] = useState(null);
  // const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  // const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-primary bg-opacity-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#8B6A37] mb-3">
          Featured Collections
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
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
              className="group w-64 overflow-hidden shadow-lg rounded-xl bg-white border border-[#E0C097] transition-transform transform hover:scale-105 flex flex-col justify-between cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={collection.images[currentIndexes[index]]}
                  alt={collection.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  // onClick={() => setSelectedCollection(collection)}
                  onClick={() => navigate(`/collection/${index}`)}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-white shadow-md"
                >
                  <FaEye className="text-[#D4AF37] text-xl" />
                </button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl text-[#8B6A37] font-semibold mb-2">
                  {collection.title}
                </h3>
                <p className="text-neutral-600 text-sm flex-grow">
                  {collection.desc}
                </p>
                {collection.discountPrice && (
                  <p className="text-[#8B6A37] font-semibold text-lg mt-2">
                    ₹{collection.discountPrice}
                  </p>
                )}
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

      {/* {selectedCollection && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-80 md:w-96 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto"
        >
          <button
            className="absolute top-4 right-4 text-xl text-[#D4AF37]"
            onClick={() => setSelectedCollection(null)}
          >
            ✖
          </button>
          <h3 className="text-2xl font-bold text-[#8B6A37] mb-4">
            {selectedCollection.title}
          </h3>
          <div className="relative">
            <img
              src={selectedCollection.images[selectedImageIndex]}
              alt={selectedCollection.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <p className="text-[#6B4F27] mt-4">{selectedCollection.desc}</p>
          <div className="flex items-center gap-4 mt-6">
            <button
              className="bg-[#D4AF37] text-white px-6 py-3 rounded hover:bg-[#B8860B] transition-all flex items-center gap-2"
              onClick={() => {
                addToCart({
                  title: selectedCollection.title,
                  image: selectedCollection.images[selectedImageIndex],
                  price: selectedCollection.price,
                });
                toast.success(`${selectedCollection.title} added to cart!`, {
                  duration: 3000,
                  position: "top-right",
                  style: {
                    background: "#D4AF37",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                });
              }}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-all">
              Buy Now
            </button>
          </div>
        </motion.div>
      )} */}
    </section>
  );
};

export default FeaturedCollections;
