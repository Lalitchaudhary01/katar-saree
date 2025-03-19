import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaGift, FaLeaf, FaAward, FaShippingFast } from "react-icons/fa";

const packagingFeatures = [
  {
    id: 1,
    icon: <FaGift />,
    title: "Elegant Gift Box",
    description:
      "Handcrafted box with premium finish for a luxurious unboxing experience",
  },
  {
    id: 2,
    icon: <FaLeaf />,
    title: "Cotton Saree Cover",
    description:
      "Rich cotton protective cover to preserve your Banarasi sarees for generations",
  },
  {
    id: 3,
    icon: <FaAward />,
    title: "Authenticity Certificate",
    description:
      "Each package includes a certificate of authenticity with unique identification",
  },
  {
    id: 4,
    icon: <FaShippingFast />,
    title: "Premium Delivery",
    description:
      "Secure shipping with trusted courier partners for your peace of mind",
  },
];

const packagingImages = [
  "/images/packaging-1.jpg",
  "/images/packaging-2.jpg",
  "/images/packaging-3.jpg",
  "/images/packaging-4.jpg",
];

const Packaging = () => {
  const [activeImage, setActiveImage] = useState(packagingImages[0]);

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
          
          .packaging-card {
            transition: all 0.4s ease-in-out;
          }
          
          .packaging-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .image-zoom {
            transition: transform 0.7s ease;
          }
          
          .image-zoom:hover {
            transform: scale(1.05);
          }
          
          .gold-gradient {
            background: linear-gradient(135deg, #D4AF37 0%, #E6BE8A 50%, #D4AF37 100%);
          }
          
          .gold-text {
            background: linear-gradient(135deg, #D4AF37 0%, #F5F3C1 50%, #D4AF37 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            display: inline;
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,1) 50%, rgba(212,175,55,0) 100%);
          }
          
          .thumbnail-border {
            border: 2px solid transparent;
            transition: all 0.3s ease;
          }
          
          .thumbnail-active {
            border: 2px solid #D4AF37;
          }
        `}
      </style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4 tracking-wide">
            WE SEND WITH <span className="gold-text">LOVE</span>
          </h2>
          <p className="font-cardo text-neutral-800 max-w-2xl mx-auto mb-8 text-lg">
            Our packaging is crafted with the same dedication and attention to
            detail as the treasures within
          </p>

          <div className="divider w-32 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Main Image and Thumbnails */}
          <div className="space-y-6">
            <motion.div
              className="overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={activeImage}
                alt="Silk Kothi Packaging"
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = "/api/placeholder/600/500";
                }}
              />
            </motion.div>

            <div className="flex justify-center gap-4">
              {packagingImages.map((img, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 overflow-hidden cursor-pointer rounded-md thumbnail-border ${
                    activeImage === img ? "thumbnail-active shadow-md" : ""
                  }`}
                  onClick={() => setActiveImage(img)}
                >
                  <img
                    src={img}
                    alt={`Packaging thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/100/100";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Packaging Description */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-6">
                SILK KOTHI <span className="gold-text">PACKAGING</span>
              </h3>

              <p className="font-cardo text-gray-700 text-lg mb-6">
                Silk Kothi promises to deliver your order with excellent
                packaging for a wonderful shopping experience within the given
                time frame. We ship throughout the week, except Sundays & public
                holidays. We use the services of reputed courier agencies only
                to ensure product's safety.
              </p>

              <p className="font-cardo text-gray-700 text-lg">
                We provide a rich cotton saree cover with each saree to preserve
                Banarasi sarees better for generations.
              </p>
            </div>

            <div className="divider w-full"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packagingFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  className="packaging-card bg-white p-6 rounded-lg shadow-md"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-2xl text-amber-700 mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="font-playfair font-bold text-lg mb-2">
                    {feature.title}
                  </h4>
                  <p className="font-cardo text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials about packaging */}
        <div className="mt-20">
          <h3 className="text-2xl font-playfair font-bold text-center mb-10">
            Customer <span className="gold-text">Experience</span>
          </h3>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="packaging-testimonials pb-12"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <SwiperSlide key={item}>
                <div className="bg-white p-8 rounded-lg shadow-md h-full">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-500">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="font-cardo text-gray-700 italic mb-6">
                    "The packaging was simply exquisite. It felt like I was
                    unwrapping a treasure. The attention to detail speaks
                    volumes about the brand's commitment to excellence."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      <span className="font-playfair text-lg">
                        {String.fromCharCode(65 + item - 1)}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-playfair font-bold">
                        Customer {item}
                      </h5>
                      <p className="text-sm text-gray-600">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Heritage Note */}
        <div className="mt-16 text-center max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
          <h4 className="font-playfair text-xl mb-4">**आत्मनिर्भर भारत**</h4>
          <p className="font-cardo text-gray-700">
            The Banaras Handloom industry employs lakhs of skilled and unskilled
            workers and artisans during the whole process of a saree making from
            manufacturing silk yarns, to dyeing process, design setup, weaving,
            cutting and packaging. Your purchase supports this rich tradition of
            craftsmanship.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Packaging;
