import React, { useState } from "react";
import { Phone } from "lucide-react";

const VideoCallShopping = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  return (
    <section className="bg-stone-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="bg-stone-300 h-80 md:h-full rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/600/400"
                alt="Elegant fabric display"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wider mb-2">
              Video Call Shopping
            </h2>
            <h3 className="text-xl md:text-2xl font-serif mb-6">
              Making your shopping experience even better
            </h3>

            <p className="text-stone-700 mb-8">
              You can schedule an appointment for the video call with our
              customer service executive by contacting us via
              call/whatsapp/email. We request you to share your choices before
              so that we take less time and keep it hassle free.
            </p>

            <button
              onClick={() => setShowAppointmentForm(true)}
              className="bg-stone-800 text-white py-3 px-6 rounded-none hover:bg-stone-900 transition duration-300 uppercase tracking-wider font-medium text-sm max-w-xs"
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif">Book Your Shopping Call</h3>
              <button
                onClick={() => setShowAppointmentForm(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-stone-800"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-stone-800"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-stone-800"
                  placeholder="Your contact number"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-stone-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Shopping Preferences
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-stone-800 h-24"
                  placeholder="Please share your shopping interests and preferences"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-stone-800 text-white py-3 uppercase tracking-wider hover:bg-stone-900 transition duration-300"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-300">
          <Phone size={24} />
        </button>
      </div>
    </section>
  );
};

export default VideoCallShopping;
