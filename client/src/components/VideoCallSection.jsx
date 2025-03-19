import React, { useState } from "react";
import { Phone, Calendar, X } from "lucide-react";

const VideoCallSection = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/api/placeholder/1920/1080')",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm shadow-2xl rounded-lg max-w-4xl w-full overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative">
              <img
                src="/api/placeholder/800/1200"
                alt="Luxury shopping collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-4 py-2 rounded-sm">
                <span className="text-xs font-medium uppercase tracking-widest text-stone-800">
                  Premium Collection
                </span>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full md:w-3/5 p-8 md:p-12">
              <h2 className="font-serif text-3xl mb-2 text-stone-900">
                Personalized Shopping
              </h2>
              <div className="w-16 h-1 bg-amber-500 mb-6"></div>

              <p className="text-stone-700 mb-8 leading-relaxed">
                Experience the pinnacle of luxury shopping with our personalized
                video call service. Our expert consultants will guide you
                through our exclusive collections, providing detailed insights
                and recommendations tailored to your preferences.
              </p>

              <div className="flex items-center mb-8">
                <div className="flex items-center mr-6">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mr-3">
                    <Calendar size={18} className="text-stone-700" />
                  </div>
                  <span className="text-sm">Flexible Scheduling</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mr-3">
                    <Phone size={18} className="text-stone-700" />
                  </div>
                  <span className="text-sm">Personalized Assistance</span>
                </div>
              </div>

              <button
                onClick={() => setShowAppointmentForm(true)}
                className="bg-stone-900 text-white flex items-center justify-center px-8 py-3 rounded-sm hover:bg-amber-700 transition duration-300 uppercase tracking-wider text-sm"
              >
                <Calendar size={16} className="mr-2" />
                Book Your Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif text-stone-900">
                Book Your Luxury Experience
              </h3>
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="text-stone-500 hover:text-stone-900"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-stone-700 mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-2 text-sm">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Your contact number"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-2 text-sm">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-2 text-sm">
                  Shopping Preferences
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 h-24"
                  placeholder="Please share your shopping interests and preferences"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-amber-600 text-white py-4 uppercase tracking-wider hover:bg-amber-700 transition duration-300 flex items-center justify-center"
              >
                <Calendar size={16} className="mr-2" />
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-amber-600 text-white rounded-full p-4 shadow-lg hover:bg-amber-700 transition duration-300">
          <Phone size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoCallSection;
