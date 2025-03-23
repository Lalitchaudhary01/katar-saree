import React, { useState, useEffect } from "react";
import { Phone, Calendar, X, ShoppingBag, Clock, Star } from "lucide-react";

const VideoCallSection = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate entrance
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Luxury background elements - Uncommented and improved */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-500 blur-3xl"></div>
      </div>

      {/* Decorative gold patterns - Uncommented and improved */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-amber-400"></div>
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-amber-600 to-amber-400"></div>
      </div> */}

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div
          className={`bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-lg max-w-4xl w-full overflow-hidden transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image with overlay */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden group">
              <img
                src="/api/placeholder/800/1200"
                alt="Luxury shopping collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4 bg-black bg-opacity-40 backdrop-blur-sm px-4 py-2 rounded-sm border-l-2 border-amber-500">
                <span className="text-xs font-medium uppercase tracking-widest text-amber-100">
                  Premium Collection
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-white text-sm mt-1">
                  Exceptional luxury service
                </p>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-3/5 p-8 md:p-10 bg-gradient-to-br from-white to-stone-50">
              <div className="transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
                <h2 className="font-serif text-3xl mb-2 text-stone-900 relative">
                  <span className="relative z-10">Personalized Shopping</span>
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-black transform transition-all duration-300 group-hover:w-full"></span>
                </h2>
                <div className="w-16 h-1 bg-black mb-6 transform transition-all duration-500 hover:w-32"></div>

                <p className="text-stone-700 mb-8 leading-relaxed">
                  Experience the pinnacle of luxury shopping with our
                  personalized video call service. Our expert consultants will
                  guide you through our exclusive collections, providing
                  detailed insights and recommendations tailored to your
                  preferences.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                  <div className="flex items-center mr-6 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white shadow-sm">
                      <Calendar
                        size={18}
                        className="text-stone-700 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-sm  transition-colors duration-300">
                      Flexible Scheduling
                    </span>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white shadow-sm">
                      <Phone
                        size={18}
                        className="text-stone-700 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-sm group-hover:text-black-800 transition-colors duration-300">
                      Personalized Assistance
                    </span>
                  </div>
                </div>

                <div className="flex items-center mb-8">
                  <div className="flex items-center mr-6 group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white shadow-sm">
                      <ShoppingBag
                        size={18}
                        className="text-stone-700 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-sm group-hover:text-black-800 transition-colors duration-300">
                      Exclusive Products
                    </span>
                  </div>
                  <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mr-3 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white shadow-sm">
                      <Clock
                        size={18}
                        className="text-stone-700 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-sm group-hover:text-black-800 transition-colors duration-300">
                      24/7 Availability
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAppointmentForm(true)}
                  className="bg-black text-white flex items-center justify-center px-8 py-3 rounded-sm transition duration-300 uppercase tracking-wider text-sm transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <Calendar size={16} className="mr-2" />
                  Book Your Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Form Modal with animation - Fixed size for desktop */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-white to-stone-50 p-6 rounded-lg w-full max-w-md shadow-2xl transform animate-scaleIn relative max-h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif text-stone-900 relative">
                Book Your Luxury Experience
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-black"></span>
              </h3>
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="text-stone-500 hover:text-stone-900 transition-colors duration-300 hover:rotate-90 transform"
              >
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-stone-700 mb-1 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-300 rounded-sm"
                  placeholder="Your name"
                />
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-stone-700 mb-1 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-300 rounded-sm"
                  placeholder="Your email"
                />
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-stone-700 mb-1 text-sm">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-300 rounded-sm"
                  placeholder="Your contact number"
                />
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-stone-700 mb-1 text-sm">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all duration-300 rounded-sm"
                />
              </div>

              <div className="transform transition-all duration-300 hover:translate-x-1">
                <label className="block text-stone-700 mb-1 text-sm">
                  Shopping Preferences
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 h-20 transition-all duration-300 rounded-sm"
                  placeholder="Please share your shopping interests and preferences"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-black text-white py-3 uppercase tracking-wider transition duration-300 flex items-center justify-center transform hover:scale-105 shadow-md hover:shadow-lg rounded-sm"
              >
                <Calendar size={16} className="mr-2" />
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 animate-bounce">
        <button className="bg-black text-white rounded-full p-4 shadow-lg transition duration-300 transform hover:scale-110">
          <Phone size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoCallSection;
