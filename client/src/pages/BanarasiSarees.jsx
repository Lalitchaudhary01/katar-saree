import { useState, useEffect } from "react";
import { FaEye, FaShoppingCart, FaHeart, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/currencyContext";
import { toast } from "react-hot-toast";

// Sample product data - replace with your actual data
const banarasiProducts = [
  {
    id: "bs001",
    title: "Royal Banarasi Silk",
    desc: "Exquisite pure silk Banarasi saree with intricate gold zari work. Traditional craftsmanship meets contemporary design.",
    images: [
      "/images/banarasi/royal-silk-1.jpg",
      "/images/banarasi/royal-silk-2.jpg",
      "/images/banarasi/royal-silk-3.jpg",
      "/images/banarasi/royal-silk-4.jpg",
    ],
    originalPrice: 18500,
    discountPrice: 15999,
    discount: "13% OFF",
    colors: ["#8B0000", "#FFD700", "#228B22"],
    category: "Silk",
    tags: ["Wedding", "Festive", "Premium"],
    material: "Pure Silk",
  },
  {
    id: "bs002",
    title: "Katan Silk Banarasi",
    desc: "Luxurious Katan silk Banarasi saree with traditional motifs and intricate border work.",
    images: [
      "/images/banarasi/katan-silk-1.jpg",
      "/images/banarasi/katan-silk-2.jpg",
      "/images/banarasi/katan-silk-3.jpg",
      "/images/banarasi/katan-silk-4.jpg",
    ],
    originalPrice: 15500,
    discountPrice: 12999,
    discount: "16% OFF",
    colors: ["#800080", "#C0C0C0", "#000080"],
    category: "Silk",
    tags: ["Wedding", "Premium"],
    material: "Katan Silk",
  },
  {
    id: "bs003",
    title: "Georgette Banarasi",
    desc: "Lightweight Georgette Banarasi saree with modern patterns perfect for parties and formal occasions.",
    images: [
      "/images/banarasi/georgette-1.jpg",
      "/images/banarasi/georgette-2.jpg",
      "/images/banarasi/georgette-3.jpg",
      "/images/banarasi/georgette-4.jpg",
    ],
    originalPrice: 9500,
    discountPrice: 7999,
    discount: "16% OFF",
    colors: ["#FF4500", "#4169E1", "#000000"],
    category: "Georgette",
    tags: ["Party", "Casual"],
    material: "Georgette",
  },
  {
    id: "bs004",
    title: "Organza Banarasi",
    desc: "Sheer Organza Banarasi saree with delicate embroidery and contemporary design elements.",
    images: [
      "/images/banarasi/organza-1.jpg",
      "/images/banarasi/organza-2.jpg",
      "/images/banarasi/organza-3.jpg",
      "/images/banarasi/organza-4.jpg",
    ],
    originalPrice: 12500,
    discountPrice: 9999,
    discount: "20% OFF",
    colors: ["#FFDAB9", "#E6E6FA", "#87CEFA"],
    category: "Organza",
    tags: ["Party", "Premium"],
    material: "Organza",
  },
  {
    id: "bs005",
    title: "Tussar Silk Banarasi",
    desc: "Rich Tussar silk Banarasi saree with traditional motifs and handcrafted border work.",
    images: [
      "/images/banarasi/tussar-1.jpg",
      "/images/banarasi/tussar-2.jpg",
      "/images/banarasi/tussar-3.jpg",
      "/images/banarasi/tussar-4.jpg",
    ],
    originalPrice: 13500,
    discountPrice: 11499,
    discount: "15% OFF",
    colors: ["#CD853F", "#A0522D", "#D2B48C"],
    category: "Silk",
    tags: ["Festive", "Premium"],
    material: "Tussar Silk",
  },
  {
    id: "bs006",
    title: "Cotton Silk Banarasi",
    desc: "Comfortable Cotton Silk blend Banarasi saree, perfect for semi-formal occasions and daily wear.",
    images: [
      "/images/banarasi/cotton-silk-1.jpg",
      "/images/banarasi/cotton-silk-2.jpg",
      "/images/banarasi/cotton-silk-3.jpg",
      "/images/banarasi/cotton-silk-4.jpg",
    ],
    originalPrice: 7500,
    discountPrice: 5999,
    discount: "20% OFF",
    colors: ["#556B2F", "#8FBC8F", "#2E8B57"],
    category: "Cotton Silk",
    tags: ["Casual", "Daily"],
    material: "Cotton Silk",
  },
  {
    id: "bs007",
    title: "Tissue Banarasi",
    desc: "Lightweight Tissue Banarasi saree with reflective zari work, perfect for evening occasions.",
    images: [
      "/images/banarasi/tissue-1.jpg",
      "/images/banarasi/tissue-2.jpg",
      "/images/banarasi/tissue-3.jpg",
      "/images/banarasi/tissue-4.jpg",
    ],
    originalPrice: 10500,
    discountPrice: 8499,
    discount: "19% OFF",
    colors: ["#FFD700", "#C0C0C0", "#FFF8DC"],
    category: "Tissue",
    tags: ["Party", "Evening"],
    material: "Tissue",
  },
  {
    id: "bs008",
    title: "Bridal Banarasi",
    desc: "Majestic Bridal Banarasi saree with heavy gold zari work and rich embellishments, perfect for wedding ceremonies.",
    images: [
      "/images/banarasi/bridal-1.jpg",
      "/images/banarasi/bridal-2.jpg",
      "/images/banarasi/bridal-3.jpg",
      "/images/banarasi/bridal-4.jpg",
    ],
    originalPrice: 25000,
    discountPrice: 21999,
    discount: "12% OFF",
    colors: ["#8B0000", "#B22222", "#800000"],
    category: "Bridal",
    tags: ["Wedding", "Bridal", "Premium"],
    material: "Pure Silk",
  },
];

const BanarasiSarees = () => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { selectedCurrency, convertPrice, formatPrice } = useCurrency();

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [filteredProducts, setFilteredProducts] = useState(banarasiProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  // Extract all categories and tags for filters
  const categories = [
    ...new Set(banarasiProducts.map((product) => product.category)),
  ];
  const tags = [
    ...new Set(banarasiProducts.flatMap((product) => product.tags)),
  ];

  // Apply filters
  useEffect(() => {
    let result = banarasiProducts;

    // Price filter
    result = result.filter(
      (product) =>
        product.discountPrice >= priceRange[0] &&
        product.discountPrice <= priceRange[1]
    );

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter((product) =>
        product.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.desc.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [priceRange, selectedCategories, selectedTags, searchQuery]);

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 25000]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchQuery("");
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setMainImage(product.images[0]);
    setSelectedColor(null);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          .font-cardo {
            font-family: 'Cardo', serif;
          }
          
          .font-playfair {
            font-family: 'Playfair Display', serif;
          }

          .card-hover {
            transition: all 0.4s ease-in-out;
          }
          
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .image-zoom {
            transition: transform 0.7s ease;
          }
          
          .image-zoom:hover {
            transform: scale(1.07);
          }
          
          .price-tag {
            position: relative;
            display: inline-block;
          }
          
          .price-tag:after {
            content: '';
            position: absolute;
            height: 1px;
            width: 100%;
            background-color: #000000;
            bottom: -2px;
            left: 0;
          }
          
          .discount-badge {
            background: linear-gradient(135deg, #000000 0%, #333333 100%);
          }

          .wishlist-btn {
            transition: all 0.3s ease;
          }

          .wishlist-btn:hover {
            transform: scale(1.15);
          }

          .wishlist-btn.active {
            color: #FF3B30;
          }

          /* Custom range slider styling */
          input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            height: 3px;
            background: #d3d3d3;
            outline: none;
            opacity: 0.7;
            -webkit-transition: .2s;
            transition: opacity .2s;
          }

          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 15px;
            height: 15px;
            background: #000;
            cursor: pointer;
            border-radius: 50%;
          }

          input[type=range]::-moz-range-thumb {
            width: 15px;
            height: 15px;
            background: #000;
            cursor: pointer;
            border-radius: 50%;
          }

          /* Custom checkbox styling */
          .custom-checkbox {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            cursor: pointer;
          }

          .custom-checkbox input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .checkmark {
            height: 18px;
            width: 18px;
            background-color: #fff;
            border: 1px solid #aaa;
            border-radius: 3px;
            margin-right: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .custom-checkbox input:checked ~ .checkmark {
            background-color: #000;
            border-color: #000;
          }

          .checkmark:after {
            content: "";
            display: none;
          }

          .custom-checkbox input:checked ~ .checkmark:after {
            display: block;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
        `}
      </style>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4 tracking-wide">
          Banarasi Sarees Collection
        </h2>
        <p className="font-cardo text-neutral-800 max-w-2xl mx-auto mb-8 text-lg">
          Exquisite handcrafted traditional Banarasi silks with intricate
          designs passed down through generations.
        </p>

        <div className="w-32 h-0.5 bg-black mx-auto"></div>
      </div>

      {/* Search and Filter Header */}
      <div className="container mx-auto px-4 mt-12">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-2/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search for sarees..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-cardo focus:outline-none focus:ring-2 focus:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-cardo"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              className="border border-black text-black px-4 py-2 rounded-lg font-cardo hover:bg-black hover:text-white transition-colors"
              onClick={clearFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-full md:w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-playfair text-xl font-bold mb-6 pb-3 border-b">
                  Filters
                </h3>

                {/* Price Filter */}
                <div className="mb-8">
                  <h4 className="font-playfair font-semibold mb-4">
                    Price Range
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-cardo">
                      ₹{priceRange[0].toLocaleString()}
                    </span>
                    <span className="font-cardo">
                      ₹{priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="mb-3"
                  />
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h4 className="font-playfair font-semibold mb-4">Material</h4>
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="custom-checkbox block mb-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span className="checkmark"></span>
                      <span className="font-cardo">{category}</span>
                    </label>
                  ))}
                </div>

                {/* Tags Filter */}
                <div className="mb-4">
                  <h4 className="font-playfair font-semibold mb-4">Occasion</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        className={`px-3 py-1 rounded-full font-cardo text-sm ${
                          selectedTags.includes(tag)
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        } transition-colors`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div
            className={`w-full ${showFilters ? "md:w-3/4 lg:w-4/5" : "w-full"}`}
          >
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-10 text-center">
                <h3 className="font-playfair text-xl font-bold mb-4">
                  No Products Found
                </h3>
                <p className="font-cardo text-gray-600">
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  className="mt-6 bg-black text-white px-6 py-2 rounded-lg font-cardo"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden bg-white flex flex-col justify-between cursor-pointer card-hover rounded-lg shadow-md"
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden group">
                      <div className="overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          onClick={() => navigate(`/collection/${product.id}`)}
                          className="w-full h-[300px] sm:h-[360px] object-cover image-zoom"
                        />
                      </div>

                      {/* Quick View Button and Wishlist Icon */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(product);
                          }}
                          className="px-6 py-2.5 bg-white/90 backdrop-blur-sm text-black rounded-full font-cardo tracking-wide text-sm flex items-center gap-2 hover:bg-white transition-all duration-300 shadow-lg"
                        >
                          <FaEye className="text-black" /> Quick View
                        </button>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleWishlistToggle(e, product)}
                        className={`absolute top-4 left-4 bg-white h-10 w-10 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 wishlist-btn ${
                          isInWishlist(product.id) ? "active" : ""
                        }`}
                      >
                        <FaHeart
                          className={`text-xl ${
                            isInWishlist(product.id)
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        />
                      </button>

                      {/* Discount Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="discount-badge text-white font-medium text-sm px-3 py-1 rounded-full shadow-md">
                          {product.discount}
                        </div>
                      </div>
                    </div>

                    {/* Product Details with Currency Conversion */}
                    <div className="p-5 flex flex-col bg-white">
                      <h3 className="text-xl text-black font-playfair font-semibold mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-center gap-3">
                        {product.originalPrice && (
                          <p className="text-gray-500 line-through text-sm font-cardo">
                            {selectedCurrency.symbol}
                            {formatPrice(convertPrice(product.originalPrice))}
                          </p>
                        )}
                        <p className="text-black font-cardo font-bold text-lg price-tag">
                          {selectedCurrency.symbol}
                          {formatPrice(convertPrice(product.discountPrice))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed View Sidebar with Currency Conversion */}
      {selectedProduct && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-80 md:w-96 h-full bg-[#FDFBF7] shadow-lg z-50 p-6 overflow-y-auto font-cardo"
        >
          <button
            className="absolute top-4 right-4 text-xl text-black hover:text-gray-700 transition-colors"
            onClick={closeModal}
          >
            ✖
          </button>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-black font-playfair">
              {selectedProduct.title}
            </h3>
            <button
              onClick={(e) => handleWishlistToggle(e, selectedProduct)}
              className={`wishlist-btn ${
                isInWishlist(selectedProduct.id) ? "active" : ""
              }`}
            >
              <FaHeart
                className={`text-2xl ${
                  isInWishlist(selectedProduct.id)
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              />
            </button>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <motion.img
              src={mainImage}
              alt="Selected"
              className="w-80 h-80 object-cover border rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            />
            <div className="flex gap-3 mt-4">
              {selectedProduct.images.slice(0, 4).map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover border rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                    mainImage === img ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 mt-6 font-cardo">
            {selectedProduct.desc}
          </p>
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <p className="text-lg">
                <s className="text-gray-500">
                  {selectedCurrency.symbol}
                  {formatPrice(convertPrice(selectedProduct.originalPrice))}
                </s>
              </p>
              <p className="text-xl font-bold text-black">
                {selectedCurrency.symbol}
                {formatPrice(convertPrice(selectedProduct.discountPrice))}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm bg-black/10 text-black px-2 py-0.5 rounded">
                {selectedProduct.discount}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-bold font-playfair text-black">Select Color:</p>
            <div className="flex justify-center gap-3 mt-3">
              {selectedProduct.colors?.map((color, index) => (
                <motion.button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-105 ${
                    selectedColor === color
                      ? "border-black scale-110"
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
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-all flex items-center gap-2 font-cardo text-lg shadow-md w-full"
              onClick={() => {
                if (!selectedColor) {
                  toast.error("Please select a color before adding to cart!");
                  return;
                }
                addToCart({
                  id: selectedProduct.id,
                  title: selectedProduct.title,
                  image: mainImage,
                  price: selectedProduct.discountPrice,
                  color: selectedColor,
                  originalPriceINR: selectedProduct.discountPrice,
                });
                toast.success(`${selectedProduct.title} added to cart!`);
                closeModal();
              }}
              disabled={!selectedColor}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart /> Add to Cart
            </motion.button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default BanarasiSarees;
