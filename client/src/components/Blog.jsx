import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaLongArrowAltRight } from "react-icons/fa";
import blogPosts from "../assets/product/blogData";

const Blog = () => {
  const navigate = useNavigate();
  const [featuredPost] = useState(blogPosts[0]);
  const [remainingPosts] = useState(blogPosts.slice(1));

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

          .blog-card {
            transition: all 0.4s ease-in-out;
          }
          
          .blog-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .image-zoom {
            transition: transform 0.7s ease;
          }
          
          .image-zoom:hover {
            transform: scale(1.05);
          }
          
          .category-badge {
            background: linear-gradient(135deg, #000000 0%, #333333 100%);
          }
          
          .read-more-link {
            position: relative;
            display: inline-block;
          }
          
          .read-more-link:after {
            content: '';
            position: absolute;
            height: 1px;
            width: 0;
            background-color: #000000;
            bottom: -2px;
            left: 0;
            transition: width 0.3s ease;
          }
          
          .read-more-link:hover:after {
            width: 100%;
          }
          
          .featured-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
          }
        `}
      </style>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4 tracking-wide">
          Blogs
        </h2>
        <p className="font-cardo text-neutral-800 max-w-2xl mx-auto mb-8 text-lg">
          Insights, stories, and explorations into the world of refined living
          and curated elegance.
        </p>

        <div className="w-32 h-0.5 bg-black mx-auto"></div>
      </div>

      {/* Featured Post */}
      {/* <div className="container mx-auto px-4 mt-16">
        <div
          className="blog-card cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
          onClick={() => navigate(`/blog/${featuredPost.id}`)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="overflow-hidden h-80 lg:h-auto">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover image-zoom"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="category-badge text-white font-medium text-xs px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaCalendarAlt size={12} />
                  <span>{featuredPost.date}</span>
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-black mb-4">
                {featuredPost.title}
              </h3>

              <p className="font-cardo text-gray-700 mb-6 text-lg">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <FaUser size={14} className="text-gray-600" />
                  <span className="text-sm text-gray-600">
                    {featuredPost.author}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {featuredPost.readTime}
                </span>
              </div>

              <motion.div
                className="mt-8 flex items-center gap-2 read-more-link"
                whileHover={{ x: 5 }}
              >
                <span className="font-cardo font-semibold">
                  Continue Reading
                </span>
                <FaLongArrowAltRight />
              </motion.div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Blog Posts Carousel */}
      <div className="container mx-auto px-4 mt-16">
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
          className="blog-carousel pb-12"
        >
          {remainingPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div
                className="blog-card group h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="relative overflow-hidden h-56 md:h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover image-zoom"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="category-badge text-white font-medium text-xs px-3 py-1 rounded-full shadow-md">
                      {post.category}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-black mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-cardo text-gray-700 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt size={12} />
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaUser size={12} className="text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {post.author}
                        </span>
                      </div>
                      <motion.div
                        className="flex items-center gap-1 read-more-link"
                        whileHover={{ x: 3 }}
                      >
                        <span className="text-sm font-semibold">Read More</span>
                        <FaLongArrowAltRight size={12} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View All Posts Button */}
      <div className="container mx-auto px-4 mt-12 text-center">
        <motion.button
          className="bg-white border-2 border-black text-black font-cardo px-8 py-3 rounded-md hover:bg-black hover:text-white transition-colors shadow-md tracking-wide"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/blog")}
        >
          View All Articles
        </motion.button>
      </div>
    </section>
  );
};

export default Blog;
