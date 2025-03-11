import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import collections from "../assets/product/CollectionData";
import newArrivals from "../assets/product/NewArrival";
import silkSarees from "../assets/product/SilkSaree";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaStar,
  FaChevronRight,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import { CgSize } from "react-icons/cg";
import { MdSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CollectionDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist(); // Extract the needed functions from useWishlist
  const navigate = useNavigate();

  const numericId = Number(id);

  const collection =
    collections.find((item) => item.id === numericId) ||
    newArrivals.find((item) => item.id === numericId) ||
    silkSarees.find((item) => item.id === numericId);

  // const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(collection?.images[0]);
  const [quantity, setQuantity] = useState(1);

  const [activeTab, setActiveTab] = useState("description");
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The product you're looking for is no longer available.
          </p>
          <button className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color before adding to cart!");
      return;
    }

    const cartItem = {
      id: collection.id,
      title: collection.title,
      image: mainImage,
      price: collection.discountPrice,
      // size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      stock: collection.stock,
      details: {
        color: collection.details?.color || selectedColor,
        technique: collection.details?.technique || "",
        fabric: collection.details?.fabric || "",
        speciality: collection.details?.speciality || "",
      },
    };

    addToCart(cartItem);
    toast.success(`${collection.title} added to your cart!`);
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: collection.id,
      title: collection.title,
      image: mainImage,
      discountPrice: collection.discountPrice,
      originalPrice: collection.originalPrice,
      stock: collection.stock,
      specialty: collection.specialty,
      colors: collection.colors,
    };

    toggleWishlist(wishlistItem);

    // Show a toast notification
    if (isInWishlist(collection.id)) {
      toast.success(`${collection.title} removed from your wishlist!`);
    } else {
      toast.success(`${collection.title} added to your wishlist!`);
    }
  };
  const handleBuyNow = () => {
    if (!selectedColor) {
      toast.error("Please select a color before buy!");
      return;
    }
    navigate("/checkout", {
      state: {
        image: mainImage,
        title: collection.title,
        quantity,
        color: selectedColor,
        amount: collection.discountPrice * quantity,
      },
    });
  };

  const handleDoubleClickZoom = (e) => {
    const image = e.currentTarget;
    if (!zoomed) {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      image.style.transformOrigin = `${x}% ${y}%`;
      image.style.transform = "scale(3)"; // Adjust zoom level as needed
    } else {
      image.style.transform = "scale(1)"; // Reset zoom
    }
    setZoomed(!zoomed);
  };

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((collection.originalPrice - collection.discountPrice) /
      collection.originalPrice) *
      100
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center">
          <span>Home</span>
          <FaChevronRight className="mx-2 text-xs" />
          <span>Collections</span>
          <FaChevronRight className="mx-2 text-xs" />
          <span className="text-black font-medium">{collection.title}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Images */}
            <div className="lg:w-3/5 p-6">
              <div className="sticky top-24">
                <div className="flex flex-col-reverse md:flex-row gap-4">
                  {/* Thumbnails */}
                  <div className="flex md:flex-col gap-3 mt-4 md:mt-0">
                    {collection.images.slice(0, 5).map((img, index) => (
                      <motion.div
                        key={index}
                        className={`relative border rounded-lg overflow-hidden cursor-pointer ${
                          mainImage === img
                            ? "border-2 border-black shadow-md"
                            : "border-gray-200"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setMainImage(img)}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-16 h-full object-cover"
                        />
                        {mainImage === img && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black bg-opacity-10"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="relative flex-1 overflow-hidden rounded-xl">
                    <div className="group relative">
                      <motion.div
                        className="relative rounded-xl overflow-hidden h-[500px]" // Set a fixed height for full image visibility
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute top-4 left-4 z-10">
                          {discountPercentage > 0 && (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {discountPercentage}% OFF
                            </span>
                          )}
                        </div>

                        <img
                          src={mainImage}
                          alt={collection.title}
                          className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300"
                          onDoubleClick={handleDoubleClickZoom} // Apply double-click zoom
                        />

                        {showZoom && (
                          <div
                            className="absolute inset-0 bg-cover bg-no-repeat opacity-0 group-hover:opacity-100 z-20 cursor-zoom-out"
                            style={{
                              backgroundImage: `url(${mainImage})`,
                              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                              transform: "scale(1.5)",
                            }}
                            onMouseMove={handleZoom}
                            onMouseLeave={() => setShowZoom(false)}
                          />
                        )}
                      </motion.div>

                      <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
                        <motion.button
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isInWishlist(collection.id)
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-700"
                          } shadow-md`}
                          onClick={handleWishlistToggle}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaHeart
                            className={
                              isInWishlist(collection.id)
                                ? "text-white"
                                : "text-gray-400"
                            }
                          />
                        </motion.button>

                        <motion.button
                          className="w-10 h-10 rounded-full bg-white text-gray-700 shadow-md flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaShare className="text-gray-400" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Details */}
            <div className="lg:w-2/5 p-8 border-l border-gray-100">
              {/* Basic product info */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < 4 ? "text-amber-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">(126 reviews)</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                  {collection.title}
                </h1>

                <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3">
                  {collection.desc}
                </p>

                <div className="flex items-baseline gap-3 mt-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{collection.discountPrice}
                  </span>
                  {collection.originalPrice > collection.discountPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{collection.originalPrice}
                    </span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      Save ₹
                      {collection.originalPrice - collection.discountPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-px bg-gray-100 my-6"></div>

              {/* Colors */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-900">Color</span>
                  <span className="text-sm text-gray-500">
                    {selectedColor || "Select a color"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {collection.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      className={`relative w-12 h-12 rounded-full transition-all ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-black"
                          : "ring-1 ring-gray-200"
                      }`}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: color }}
                      ></span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-900">Size</span>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <CgSize className="mr-1" />
                    Size guide
                  </button>
                </div>
                {/* Assuming you have sizes array in your collection data */}
                {/* <div className="grid grid-cols-4 gap-2">
                  {(collection.sizes || ["S", "M", "L", "XL"]).map(
                    (size, index) => (
                      <motion.button
                        key={index}
                        className={`py-3 border rounded-lg text-center transition ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-800"
                        }`}
                        onClick={() => setSelectedSize(size)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    )
                  )}
                </div> */}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="font-medium text-gray-900 block mb-3">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-200 rounded-lg w-32">
                  <button
                    className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:text-gray-800"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center">{quantity}</span>
                  <button
                    className="w-10 h-10 flex items-center justify-center text-lg text-gray-600 hover:text-gray-800"
                    onClick={() =>
                      setQuantity(Math.min(collection.stock, quantity + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                <motion.button
                  className="flex-1 bg-black text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShoppingCart />
                  Add to Cart
                </motion.button>
                <motion.button
                  className="flex-1 bg-[#8B6A37] text-white py-4 rounded-lg font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </motion.button>
                ;
              </div>

              {/* Product information */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaTruck className="text-blue-500" />
                  <span>Free shipping on orders over ₹1000</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaUndo className="text-blue-500" />
                  <span>Easy 30 days return policy</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MdSecurity className="text-blue-500" />
                  <span>Secure payment guaranteed</span>
                </div>
              </div>

              {/* Stock info */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Availability:</span>
                  <span
                    className={
                      collection.stock > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {collection.stock > 0
                      ? `In Stock (${collection.stock} left)`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product details tabs */}
          <div className="border-t border-gray-100 mt-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              {["description", "details", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap capitalize ${
                    activeTab === tab
                      ? "text-black border-b-2 border-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p>{collection.desc}</p>
                  <p className="mt-4">
                    Our {collection.title} is a celebration of traditional
                    craftsmanship with modern elegance. Each piece is
                    handcrafted by skilled artisans, ensuring unparalleled
                    quality and attention to detail.
                  </p>
                  <p className="mt-4">
                    This versatile piece adds sophistication to any wardrobe and
                    is perfect for special occasions.
                  </p>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Product Details
                        </h3>
                        <ul className="mt-2 space-y-2 text-gray-600">
                          <li>
                            Specialty: {collection.details?.speciality || "N/A"}
                          </li>
                          <li>
                            Color:{" "}
                            {collection.details?.color ||
                              selectedColor ||
                              "N/A"}
                          </li>
                          <li>
                            Technique: {collection.details?.technique || "N/A"}
                          </li>
                          <li>Fabric: {collection.details?.fabric || "N/A"}</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900">
                          Care Instructions
                        </h3>
                        <ul className="mt-2 space-y-2 text-gray-600">
                          <li>Dry clean only</li>
                          <li>Store in a cool, dry place</li>
                          <li>Avoid direct sunlight</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Speciality
                        </h3>
                        <p className="mt-2 text-gray-600">
                          {collection.details?.specialityDescription ||
                            `A bridal favorite with a rich texture and grand design. Our ${
                              collection.specialty || "premium"
                            } collection features ${
                              collection.details?.fabric ||
                              "high-quality material"
                            } with intricate designs that are perfect for weddings and special occasions.`}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900">
                          Sizing Information
                        </h3>
                        <p className="mt-2 text-gray-600">
                          Please refer to our size guide for detailed
                          measurements. If you're between sizes, we recommend
                          sizing up for a more comfortable fit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Customer Reviews
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < 4 ? "text-amber-400" : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600">
                          Based on 126 reviews
                        </span>
                      </div>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium">
                      Write a review
                    </button>
                  </div>

                  <div>
                    {/* Sample reviews - would be dynamically loaded in real implementation */}
                    <div className="border-b border-gray-100 pb-6 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                            S
                          </div>
                          <span className="font-medium">Sanjana M.</span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          2 months ago
                        </span>
                      </div>
                      <div className="flex text-amber-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < 5 ? "text-amber-400" : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">
                        Absolutely stunning piece! The craftsmanship is
                        exceptional, and the gold zari work is just beautiful.
                        Perfect for my wedding reception. Highly recommend!
                      </p>
                    </div>

                    <div className="border-b border-gray-100 pb-6 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                            R
                          </div>
                          <span className="font-medium">Ravi K.</span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          1 month ago
                        </span>
                      </div>
                      <div className="flex text-amber-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < 4 ? "text-amber-400" : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">
                        Bought this for my wife and she absolutely loves it. The
                        color is exactly as shown in the images, and the
                        material quality is excellent. Shipping was also very
                        quick.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Load more reviews
                      <FaChevronRight className="ml-1 text-xs" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-6">
                  <h3 className="font-medium text-gray-900">
                    Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Standard Shipping
                      </h4>
                      <p className="text-gray-600">
                        Orders typically ship within 2-3 business days. Delivery
                        takes 5-7 business days depending on your location. Free
                        shipping on all orders above ₹1000.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Express Shipping
                      </h4>
                      <p className="text-gray-600">
                        Need it faster? Select express shipping at checkout for
                        delivery within 3-4 business days. Additional charges
                        apply.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Returns & Exchanges
                      </h4>
                      <p className="text-gray-600">
                        We accept returns within 30 days of delivery. Items must
                        be unused, unwashed, and in the original packaging.
                        Please note that personalized or customized items cannot
                        be returned.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {collections.slice(0, 4).map((item) => (
              <motion.div
                key={item.id}
                className="group relative bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]"
                whileHover={{ y: -5 }}
              >
                <div className="overflow-hidden h-[70%]">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                      onClick={() => {
                        const wishlistItem = {
                          id: item.id,
                          title: item.title,
                          image: item.images[0],
                          discountPrice: item.discountPrice,
                          originalPrice: item.originalPrice,
                          stock: item.stock,
                          specialty: item.specialty,
                          colors: item.colors,
                        };
                        toggleWishlist(wishlistItem);
                      }}
                    >
                      <FaHeart
                        className={
                          isInWishlist(item.id)
                            ? "text-red-500"
                            : "text-gray-400 group-hover:text-red-500 transition"
                        }
                      />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between h-[30%]">
                  <h3 className="font-medium text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-gray-900">
                        ₹{item.discountPrice}
                      </span>
                      {item.originalPrice > item.discountPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < 4 ? "text-amber-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/collection/${item.id}`)}
                    className="w-full mt-3 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition text-sm font-medium"
                  >
                    Quick View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
