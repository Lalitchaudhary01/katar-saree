import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

// Sample testimonial data - in a real app, this would come from your backend
const initialTestimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    position: "Loyal Customer",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    text: "The craftsmanship of their products is exceptional. I've purchased multiple items and each one has exceeded my expectations in quality and design.",
    date: "March 5, 2025",
  },
  {
    id: 2,
    name: "Rahul Patel",
    position: "Fashion Enthusiast",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    text: "The attention to detail in their traditional designs while maintaining a contemporary feel makes their collection stand out. Shipping was also remarkably fast.",
    date: "February 21, 2025",
  },
  {
    id: 3,
    name: "Ananya Desai",
    position: "First-time Buyer",
    image: "https://randomuser.me/api/portraits/women/54.jpg",
    rating: 5,
    text: "I was hesitant to purchase online, but the quality of the fabrics and the craftsmanship exceeded my expectations. Will definitely be ordering again!",
    date: "January 15, 2025",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    position: "",
    text: "",
    rating: 5,
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setNewTestimonial((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!newTestimonial.name || !newTestimonial.text) {
      toast.error("Please fill in your name and review");
      return;
    }

    // Create new testimonial
    const newEntry = {
      id: testimonials.length + 1,
      ...newTestimonial,
      image: "https://randomuser.me/api/portraits/lego/1.jpg", // Default image
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    // Add to testimonials
    setTestimonials([...testimonials, newEntry]);

    // Reset form and hide it
    setNewTestimonial({
      name: "",
      position: "",
      text: "",
      rating: 5,
    });

    toast.success("Thank you for your review!");
    setShowForm(false);
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
          
          .testimonial-card {
            transition: all 0.4s ease-in-out;
            height: 100%;
          }
          
          .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .star-rating {
            color: #DDDDDD;
            cursor: pointer;
          }
          
          .star-filled {
            color: #FFD700;
          }
          
          .quote-icon {
            opacity: 0.15;
          }
        `}
      </style>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4 tracking-wide">
          Customer Testimonials
        </h2>
        <p className="font-cardo text-neutral-800 max-w-2xl mx-auto mb-8 text-lg">
          Discover what our customers have to say about their experience with
          our products and services.
        </p>
        <div className="w-32 h-0.5 bg-black mx-auto mb-16"></div>

        {/* Testimonial Slider */}
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card bg-white shadow-md rounded-lg p-6 mb-10 flex flex-col relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                    />
                  </div>

                  <div className="mt-12">
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={
                            star <= testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                          size={20}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <FaQuoteLeft className="quote-icon absolute -top-3 left-0 text-4xl text-gray-200" />
                      <p className="font-cardo text-gray-700 italic mb-6 pt-4 px-6">
                        {testimonial.text}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <h3 className="font-playfair font-semibold text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="font-cardo text-gray-600 text-sm">
                        {testimonial.position}
                      </p>
                      <p className="font-cardo text-gray-500 text-xs mt-1">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Add Review Button */}
        <div className="mt-8">
          <motion.button
            className="bg-[#4b1e1e] text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-all font-cardo text-lg shadow-md mx-auto"
            onClick={() => setShowForm(!showForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showForm ? "Cancel" : "Share Your Experience"}
          </motion.button>
        </div>

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-playfair font-bold mb-6">
              Share Your Experience
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block font-cardo font-bold mb-2 text-left"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTestimonial.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 font-cardo"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  className="block font-cardo font-bold mb-2 text-left"
                  htmlFor="position"
                >
                  Your Title (Optional)
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={newTestimonial.position}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 font-cardo"
                  placeholder="e.g. Fashion Enthusiast, Regular Customer"
                />
              </div>

              <div className="mb-6">
                <label className="block font-cardo font-bold mb-2 text-left">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={30}
                      className={`star-rating ${
                        star <= (hoveredStar || newTestimonial.rating)
                          ? "star-filled"
                          : ""
                      }`}
                      onClick={() => handleRatingChange(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label
                  className="block font-cardo font-bold mb-2 text-left"
                  htmlFor="text"
                >
                  Your Review
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={newTestimonial.text}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 font-cardo min-h-[150px]"
                  placeholder="Share your experience with our products..."
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  className="bg-black text-white px-12 py-3 rounded-md hover:bg-gray-900 transition-all font-cardo text-lg shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Submit Review
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
