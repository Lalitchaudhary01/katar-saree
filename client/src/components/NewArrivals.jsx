import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaEye, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-hot-toast";
import newArrivals from "../assets/product/NewArrival";

const NewArrivals = () => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setMainImage(product.images[0]);
    setSelectedSize(null);
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
        `}
      </style>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4 tracking-wide">
          New Arrivals
        </h2>
        <p className="font-cardo text-neutral-800 max-w-2xl mx-auto mb-8 text-lg">
          The latest additions to our collection, blending tradition with
          contemporary design.
        </p>

        <div className="w-32 h-0.5 bg-black mx-auto"></div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={false}
          autoplay={{ delay: 3000 }}
          className="product-carousel"
        >
          {newArrivals.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group w-full max-w-[350px] mx-auto overflow-hidden bg-white flex flex-col justify-between cursor-pointer card-hover rounded-lg shadow-md">
                {/* Image Section */}
                <div className="relative overflow-hidden group">
                  <div className="overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      onClick={() => navigate(`/collection/${product.id}`)}
                      className="w-full h-[460px] object-cover image-zoom"
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

                  {/* New Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="discount-badge text-white font-medium text-sm px-3 py-1 rounded-full shadow-md">
                      New
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 flex flex-col bg-white">
                  <h3 className="text-xl text-black font-playfair font-semibold mb-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    {product.originalPrice && (
                      <p className="text-gray-500 line-through text-sm font-cardo">
                        ₹{product.originalPrice}
                      </p>
                    )}
                    <p className="text-black font-cardo font-bold text-lg price-tag">
                      ₹{product.discountPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Detailed View Sidebar */}
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
              className="w-80 h-100 object-cover border rounded-lg shadow-md"
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
                  ₹{selectedProduct.originalPrice}
                </s>
              </p>
              <p className="text-xl font-bold text-black">
                ₹{selectedProduct.discountPrice}
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
                });
                toast.success(`${selectedProduct.title} added to cart!`);
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

export default NewArrivals;
