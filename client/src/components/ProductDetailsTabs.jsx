import React, { useState } from "react";
import { FaStar, FaChevronRight } from "react-icons/fa";

const ProductDetailsTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="border-t border-gray-100 mt-4 md:mt-6">
      <div className="flex overflow-x-auto scrollbar-hide py-2">
        {["description", "details", "reviews", "shipping"].map((tab) => (
          <button
            key={tab}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-xs md:text-sm whitespace-nowrap capitalize ${
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

      <div className="p-4 md:p-6">
        {activeTab === "description" && (
          <div className="prose max-w-none text-sm md:text-base">
            <p>{product.desc}</p>
            <p className="mt-3 md:mt-4">
              Our {product.title} is a celebration of traditional craftsmanship
              with modern elegance. Each piece is handcrafted by skilled
              artisans, ensuring unparalleled quality and attention to detail.
            </p>
            <p className="mt-3 md:mt-4">
              This versatile piece adds sophistication to any wardrobe and is
              perfect for special occasions.
            </p>
          </div>
        )}

        {activeTab === "details" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    Product Details
                  </h3>
                  <ul className="mt-2 space-y-1 md:space-y-2 text-gray-600 text-sm md:text-base">
                    <li>Specialty: {product.details?.speciality || "N/A"}</li>
                    <li>Color: {product.details?.color || "N/A"}</li>
                    <li>Technique: {product.details?.technique || "N/A"}</li>
                    <li>Fabric: {product.details?.fabric || "N/A"}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    Care Instructions
                  </h3>
                  <ul className="mt-2 space-y-1 md:space-y-2 text-gray-600 text-sm md:text-base">
                    <li>Dry clean only</li>
                    <li>Store in a cool, dry place</li>
                    <li>Avoid direct sunlight</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 mt-4 md:mt-0">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    Speciality
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm md:text-base">
                    {product.details?.specialityDescription ||
                      `A bridal favorite with a rich texture and grand design. Our ${
                        product.specialty || "premium"
                      } collection features ${
                        product.details?.fabric || "high-quality material"
                      } with intricate designs that are perfect for weddings and special occasions.`}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 text-sm md:text-base">
                    Sizing Information
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm md:text-base">
                    Please refer to our size guide for detailed measurements. If
                    you're between sizes, we recommend sizing up for a more
                    comfortable fit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-medium text-gray-900 text-sm md:text-base">
                  Customer Reviews
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xs md:text-sm ${
                          i < 4 ? "text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-xs md:text-sm">
                    Based on 126 reviews
                  </span>
                </div>
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium w-full sm:w-auto">
                Write a review
              </button>
            </div>

            <div>
              {/* Sample reviews - would be dynamically loaded in real implementation */}
              <div className="border-b border-gray-100 pb-4 md:pb-6 mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs md:text-sm">
                      S
                    </div>
                    <span className="font-medium text-sm md:text-base">
                      Sanjana M.
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs md:text-sm">
                    2 months ago
                  </span>
                </div>
                <div className="flex text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xs md:text-sm ${
                        i < 5 ? "text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Absolutely stunning piece! The craftsmanship is exceptional,
                  and the gold zari work is just beautiful. Perfect for my
                  wedding reception. Highly recommend!
                </p>
              </div>

              <div className="border-b border-gray-100 pb-4 md:pb-6 mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xs md:text-sm">
                      R
                    </div>
                    <span className="font-medium text-sm md:text-base">
                      Ravi K.
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs md:text-sm">
                    1 month ago
                  </span>
                </div>
                <div className="flex text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xs md:text-sm ${
                        i < 4 ? "text-amber-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Bought this for my wife and she absolutely loves it. The color
                  is exactly as shown in the images, and the material quality is
                  excellent. Shipping was also very quick.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm md:text-base">
                Load more reviews
                <FaChevronRight className="ml-1 text-xs" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-6">
            <h3 className="font-medium text-gray-900">Shipping Information</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Standard Shipping
                </h4>
                <p className="text-gray-600">
                  Orders typically ship within 2-3 business days. Delivery takes
                  5-7 business days depending on your location. Free shipping on
                  all orders above ₹1000.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Express Shipping
                </h4>
                <p className="text-gray-600">
                  Need it faster? Select express shipping at checkout for
                  delivery within 3-4 business days. Additional charges apply.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Returns & Exchanges
                </h4>
                <p className="text-gray-600">
                  We accept returns within 30 days of delivery. Items must be
                  unused, unwashed, and in the original packaging. Please note
                  that personalized or customized items cannot be returned.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsTabs;
