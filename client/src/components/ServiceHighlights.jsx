import React from "react";
import { Truck, Store, MessageCircle, MapPin } from "lucide-react";

const ServiceHighlights = () => {
  return (
    <div className="w-full bg-white py-6 border-t border-b border-gray-100 font-serif">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {/* Free Shipping */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center text-teal-600 mb-3">
              <Truck size={44} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Free Shipping
            </h3>
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "Garamond, serif" }}
            >
              When you spend ₹2,500+
            </p>
          </div>

          {/* Store Pickup */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center text-teal-600 mb-3">
              <Store size={44} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Store Pickup
            </h3>
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Pick your order up yourself, for free
            </p>
          </div>

          {/* Chat With Us */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center text-teal-600 mb-3">
              <MessageCircle size={44} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Chat With Us
            </h3>
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "Garamond, serif" }}
            >
              We offer 24-hour chat support
            </p>
          </div>

          {/* Locations */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center text-teal-600 mb-3">
              <MapPin size={44} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Locations
            </h3>
            <p
              className="text-gray-500 text-sm"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Find a store near you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHighlights;
