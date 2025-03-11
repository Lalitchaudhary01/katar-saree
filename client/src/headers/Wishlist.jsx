import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaTrash,
  FaShareAlt,
  FaEye,
} from "react-icons/fa";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      title: item.title,
      image: item.image || item.images[0],
      price: item.discountPrice,
      color: item.colors ? item.colors[0] : null,
      quantity: 1,
      stock: item.stock,
      specialty: item.specialty,
    };

    addToCart(cartItem);
    toast.success(`${item.title} added to your cart!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-[#FAF7F2] py-12 min-h-screen">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          .font-cardo {
            font-family: 'Cardo', serif;
          }
          
          .font-playfair {
            font-family: 'Playfair Display', serif;
          }
          
          .overlay-gradient {
            background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
          }
          
          .item-hover {
            transition: all 0.3s ease-in-out;
          }
          
          .item-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .gold-accent {
            background: linear-gradient(135deg, #D4AF37 0%, #F9F295 50%, #D4AF37 100%);
          }
          
          .btn-hover {
            transition: all 0.3s ease;
            overflow: hidden;
            position: relative;
          }
          
          .btn-hover:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background-color: rgba(255,255,255,0.1);
            transition: all 0.3s ease;
          }
          
          .btn-hover:hover:after {
            width: 100%;
          }
        `}
      </style>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center mb-10">
          <button
            className="mr-4 text-gray-600 hover:text-black transition-colors"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <h1 className="text-3xl font-playfair font-bold text-gray-900">
            My Wishlist
          </h1>
          <div className="ml-4 relative">
            <span className="ml-1 px-3 py-1 gold-accent text-black font-medium rounded-full text-sm shadow-sm">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "Item" : "Items"}
            </span>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-100">
            <div className="w-24 h-24 bg-[#FDF5E6] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <FaHeart className="text-[#D4AF37] text-3xl" />
            </div>
            <h2 className="text-3xl font-playfair font-medium text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto font-cardo text-lg">
              Discover our exquisite collection of handcrafted sarees and add
              your favorites to your wishlist.
            </p>
            <motion.button
              onClick={() => navigate("/collection")}
              className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-900 transition font-cardo text-lg tracking-wide shadow-md btn-hover"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Collections
            </motion.button>
          </div>
        ) : (
          <>
            <div className="mb-8 p-5 bg-[#FDF5E6] rounded-lg border border-[#E8D9B5] shadow-sm">
              <p className="font-cardo text-gray-700 text-center">
                <span className="font-semibold">Tip:</span> Our collections are
                limited editions. Add your favorites to cart before they sell
                out!
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden item-hover border border-gray-50"
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative">
                    <div className="overflow-hidden aspect-[3/4]">
                      <img
                        src={item.image || (item.images && item.images[0])}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        onClick={() => navigate(`/collection/${item.id}`)}
                      />
                    </div>

                    {/* Overlay with actions on hover */}
                    <div
                      className={`absolute inset-0 overlay-gradient flex flex-col justify-end p-4 transition-opacity duration-300 ${
                        hoveredItem === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <motion.button
                          onClick={() => navigate(`/collection/${item.id}`)}
                          className="bg-white/90 backdrop-blur-sm text-black p-2 rounded-full shadow-md"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaEye className="text-lg" />
                        </motion.button>

                        <div className="flex gap-2">
                          <motion.button
                            className="bg-white/90 backdrop-blur-sm text-black p-2 rounded-full shadow-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                window.location.origin +
                                  `/collection/${item.id}`
                              );
                              toast.success("Link copied to clipboard!");
                            }}
                          >
                            <FaShareAlt className="text-lg" />
                          </motion.button>

                          <motion.button
                            className="bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full shadow-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <FaTrash className="text-lg" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Discount tag if exists */}
                    {item.discount && (
                      <div className="absolute top-4 left-4">
                        <div className="gold-accent text-black font-medium px-3 py-1 rounded-full text-sm shadow-md">
                          {item.discount} OFF
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-5 border-t border-gray-100">
                    <h3
                      className="font-playfair font-semibold text-xl text-gray-900 hover:text-[#D4AF37] transition-colors cursor-pointer mb-1"
                      onClick={() => navigate(`/collection/${item.id}`)}
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-500 font-cardo text-sm mb-3">
                      {item.desc
                        ? item.desc.length > 70
                          ? item.desc.substring(0, 70) + "..."
                          : item.desc
                        : "Handcrafted premium saree"}
                    </p>

                    <div className="flex items-center justify-between mt-3 mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-playfair font-bold text-xl text-gray-900">
                          ₹{item.discountPrice}
                        </span>
                        {item.originalPrice > item.discountPrice && (
                          <span className="text-sm text-gray-500 line-through font-cardo">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Color options if available */}
                      {item.colors && item.colors.length > 0 && (
                        <div className="flex gap-1">
                          {item.colors.slice(0, 3).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                          {item.colors.length > 3 && (
                            <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px] text-gray-600">
                              +{item.colors.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-black text-white py-3 rounded-md font-cardo text-base hover:bg-gray-900 transition flex items-center justify-center gap-2 btn-hover"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaShoppingCart className="text-sm" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {wishlistItems.length > 0 && (
              <div className="mt-12 flex justify-center">
                <motion.button
                  onClick={() => navigate("/collection")}
                  className="bg-transparent border border-black text-black py-3 px-8 rounded-md hover:bg-black hover:text-white transition font-cardo tracking-wide btn-hover"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
