import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaArrowLeft,
  FaShare,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import blogPosts from "../assets/product/blogData";

const BlogPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Find the blog post with the matching ID
    const blogId = parseInt(id);
    const foundPost = blogPosts.find((post) => post.id === blogId);

    if (foundPost) {
      setPost(foundPost);

      // Find related posts with the same category or tags
      const related = blogPosts
        .filter(
          (p) =>
            p.id !== blogId &&
            (p.category === foundPost.category ||
              p.tags.some((tag) => foundPost.tags.includes(tag)))
        )
        .slice(0, 3);

      setRelatedPosts(related);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
        <h2 className="text-3xl font-playfair font-bold mb-4">
          Blog Post Not Found
        </h2>
        <p className="font-cardo text-lg mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-cardo"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          .font-cardo {
            font-family: 'Cardo', serif;
          }
          
          .font-playfair {
            font-family: 'Playfair Display', serif;
          }
          
          .blog-content p {
            margin-bottom: 1.5rem;
            line-height: 1.8;
          }
          
          .blog-content h2 {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: 1.875rem;
            margin-top: 2.5rem;
            margin-bottom: 1.5rem;
          }
          
          .blog-content blockquote {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 1.25rem;
            border-left: 3px solid #000;
            padding-left: 1.5rem;
            margin: 2rem 0;
            color: #333;
          }
          
          .blog-content strong {
            font-weight: 700;
          }
          
          .category-badge {
            background: linear-gradient(135deg, #000000 0%, #333333 100%);
          }
          
          .related-card {
            transition: all 0.3s ease-in-out;
          }
          
          .related-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }
          
          .social-icon {
            transition: all 0.3s ease;
          }
          
          .social-icon:hover {
            transform: translateY(-3px);
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/90 backdrop-blur-sm px-6 py-8 max-w-4xl rounded-lg shadow-lg">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="category-badge text-white font-medium text-xs px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaCalendarAlt size={12} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaClock size={12} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-playfair font-bold text-black mb-4">
                {post.title}
              </h1>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <FaUser size={14} />
                <span className="text-sm">{post.author}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-cardo"
        >
          <FaArrowLeft size={12} />
          <span>Back to all articles</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="blog-content font-cardo text-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-playfair font-bold text-2xl mb-4">
              Share This Article
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="social-icon w-10 h-10 bg-[#3b5998] text-white rounded-full flex items-center justify-center"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 bg-[#1da1f2] text-white rounded-full flex items-center justify-center"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 bg-[#0077b5] text-white rounded-full flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="social-icon w-10 h-10 bg-[#e60023] text-white rounded-full flex items-center justify-center"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center mb-12">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="related-card bg-[#FDFBF7] rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => {
                    navigate(`/blog/${relatedPost.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="category-badge text-white font-medium text-xs px-3 py-1 rounded-full">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-playfair font-bold mt-3 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="font-cardo text-gray-600 text-sm mb-4">
                      {relatedPost.excerpt.length > 100
                        ? `${relatedPost.excerpt.substring(0, 100)}...`
                        : relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="bg-[#F3F0E9] py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Subscribe to Our Journal
          </h2>
          <p className="font-cardo text-gray-700 mb-8">
            Stay updated with our latest articles, style guides, and exclusive
            content.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-md font-cardo focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-cardo">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetails;
