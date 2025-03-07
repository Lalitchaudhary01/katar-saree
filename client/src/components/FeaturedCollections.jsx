import React, { useState, useEffect, useRef } from "react";
import collections from "../assets/product/CollectionData";
import { motion, useAnimation } from "framer-motion";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FeaturedCollections = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndexes, setCurrentIndexes] = useState(
    collections.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const hoverTimers = useRef({});
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCollection) {
      setMainImage(selectedCollection.images[0]);
    }
  }, [selectedCollection]);

  useEffect(() => {
    return () => {
      Object.values(hoverTimers.current).forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, []);

  const handleMouseEnter = (index) => {
    hoverTimers.current[index] = setTimeout(() => {
      setCurrentIndexes((prevIndexes) => ({
        ...prevIndexes,
        [index]: (prevIndexes[index] + 1) % collections[index].images.length,
      }));
    }, 1000);
    setHoveredIndex(index);
  };

  const handleMouseLeave = (index) => {
    if (hoverTimers.current[index]) {
      clearTimeout(hoverTimers.current[index]);
    }
    setHoveredIndex(null);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap');
          
          .font-cardo {
            font-family: 'Cardo', serif;
          }

          .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.5s, box-shadow 0.5s;
          }

          .card-3d:hover {
            transform: rotateY(10deg) rotateX(10deg) scale(1.05);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-cardo font-bold text-[#8B6A37] mb-4 tracking-wide">
          Featured Collections
        </h2>
        <p className="font-cardo text-neutral-600 max-w-2xl mx-auto mb-8 italic text-lg whitespace-nowrap">
          Explore our curated selection of premium handcrafted pieces, each
          telling a story of heritage and artistry.
        </p>

        <div className="w-32 h-0.5 bg-[#D4AF37] mx-auto"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mt-16">
        {collections
          .slice(0, showAll ? collections.length : 4)
          .map((collection, index) => (
            <motion.div
              key={index}
              className="group w-64 overflow-hidden shadow-2xl rounded-lg bg-white border border-[#E0C097] transition-transform transform hover:scale-105 flex flex-col justify-between cursor-pointer card-3d"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              whileHover={{ scale: 1.05, rotateY: 10, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={collection.images[currentIndexes[index]]}
                  alt={collection.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  onClick={() => navigate(`/collection/${index}`)}
                  whileHover={{ scale: 1.1 }}
                />

                <motion.button
                  onClick={() => setSelectedCollection(collection)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#F9F6F0]"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaEye className="text-[#D4AF37] text-xl" />
                </motion.button>
              </div>

              <div className="p-5 flex flex-col flex-grow bg-white">
                <h3 className="text-xl text-[#8B6A37] font-cardo font-bold mb-3">
                  {collection.title}
                </h3>
                <p className="text-neutral-600 text-sm font-cardo flex-grow">
                  {collection.desc}
                </p>
                {collection.discountPrice && (
                  <p className="text-[#8B6A37] font-cardo font-bold text-lg mt-3">
                    ₹{collection.discountPrice}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
      </div>

      <div className="mt-16 text-center">
        {!showAll && (
          <motion.button
            onClick={() => setShowAll(true)}
            className="bg-[#8B6A37] text-white px-10 py-3 rounded-md hover:bg-[#B8860B] transition-all font-cardo text-lg tracking-wide shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Collections
          </motion.button>
        )}
      </div>

      {selectedCollection && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-80 md:w-96 h-full bg-[#F9F6F0] shadow-lg z-50 p-6 overflow-y-auto font-cardo"
        >
          <button
            className="absolute top-4 right-4 text-xl text-[#D4AF37] hover:text-[#8B6A37] transition-colors"
            onClick={() => setSelectedCollection(null)}
          >
            ✖
          </button>
          <h3 className="text-2xl font-bold text-[#8B6A37] mb-4 font-cardo">
            {selectedCollection.title}
          </h3>
          <div className="mt-4 flex flex-col items-center">
            <motion.img
              src={mainImage}
              alt="Selected"
              className="w-80 h-80 object-cover border rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex gap-3 mt-4">
              {selectedCollection.images.slice(0, 4).map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover border rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                    mainImage === img ? "border-2 border-[#D4AF37]" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
          <p className="text-[#6B4F27] mt-6 font-cardo italic">
            {selectedCollection.desc}
          </p>
          <div className="mt-4 ">
            <p className="text-lg">
              Original Price:{" "}
              <s className="text-gray-500">
                ₹{selectedCollection.originalPrice}
              </s>
            </p>
            <p className="text-xl font-bold text-[#8B6A37]">
              ₹{selectedCollection.discountPrice}{" "}
              <span className="text-sm text-red-600">
                ({selectedCollection.discount} off)
              </span>
            </p>
          </div>

          <div className="mt-6 ">
            <p className="font-bold font-cardo text-[#8B6A37]">Select Size:</p>
            <div className="flex  gap-2 mt-3">
              {selectedCollection.sizes?.map((size, index) => (
                <motion.button
                  key={index}
                  className={`px-4 py-2 border font-cardo rounded-md text-sm transition-colors ${
                    selectedSize === size
                      ? "bg-[#8B6A37] text-white border-[#8B6A37]"
                      : "bg-white text-[#8B6A37] border-[#D4AF37] hover:bg-[#F9F6F0]"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  whileHover={{ scale: 1.05 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-bold font-cardo text-[#8B6A37]">Select Color:</p>
            <div className="flex  gap-3 mt-3">
              {selectedCollection.colors?.map((color, index) => (
                <motion.button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-105 ${
                    selectedColor === color
                      ? "border-[#8B6A37] scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  whileHover={{ scale: 1.1 }}
                ></motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center mt-8">
            <motion.button
              className="bg-[#D4AF37] text-white px-8 py-3 rounded-md hover:bg-[#B8860B] transition-all flex items-center gap-2 font-cardo text-lg shadow-md"
              onClick={() => {
                if (!selectedSize || !selectedColor) {
                  toast.error(
                    "Please select a size and color before adding to cart!"
                  );
                  return;
                }

                addToCart({
                  id:
                    selectedCollection.id ||
                    Math.random().toString(36).substr(2, 9),
                  title: selectedCollection.title,
                  image: mainImage,
                  price:
                    selectedCollection.discountPrice ||
                    selectedCollection.originalPrice,
                  size: selectedSize,
                  color: selectedColor,
                });

                toast.success(`${selectedCollection.title} added to cart!`);
              }}
              disabled={!selectedSize || !selectedColor}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart /> Add to Cart
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default FeaturedCollections;
