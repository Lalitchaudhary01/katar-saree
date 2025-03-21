import React from "react";
import { Truck, Store, MessageCircle, MapPin } from "lucide-react";

const ServiceHighlights = () => {
  return (
    <div className="w-full bg-white py-6 border-t border-b border-gray-100 font-serif">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {/* Free Shipping */}
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-10 h-10 flex items-center justify-center text-teal mb-2">
              <Truck size={32} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1 text-sm sm:text-base"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Free Shipping
            </h3>
            <p
              className="text-gray-500 text-xs sm:text-sm"
              style={{ fontFamily: "Garamond, serif" }}
            >
              When you spend ₹2,500+
            </p>
          </div>

          {/* Store Pickup */}
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-10 h-10 flex items-center justify-center text-teal mb-2">
              <Store size={32} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1 text-sm sm:text-base"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Store Pickup
            </h3>
            <p
              className="text-gray-500 text-xs sm:text-sm"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Pick your order up yourself, for free
            </p>
          </div>

          {/* Chat With Us */}
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-10 h-10 flex items-center justify-center text-teal mb-2">
              <MessageCircle size={32} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1 text-sm sm:text-base"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Chat With Us
            </h3>
            <p
              className="text-gray-500 text-xs sm:text-sm"
              style={{ fontFamily: "Garamond, serif" }}
            >
              We offer 24-hour chat support
            </p>
          </div>

          {/* Locations */}
          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-10 h-10 flex items-center justify-center text-teal mb-2">
              <MapPin size={32} strokeWidth={1.9} />
            </div>
            <h3
              className="text-gray-700 font-medium mb-1 text-sm sm:text-base"
              style={{ fontFamily: "Garamond, serif" }}
            >
              Locations
            </h3>
            <p
              className="text-gray-500 text-xs sm:text-sm"
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
