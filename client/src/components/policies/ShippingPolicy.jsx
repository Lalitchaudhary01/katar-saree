import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-[#E5D1B8] to-[#F7F1E5] py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10 border border-[#D6B792]">
        <h2 className="text-4xl font-bold text-[#7A5520] text-center mb-6">
          Shipping Policy
        </h2>
        <p className="text-lg text-[#6A4A2D] mb-4">
          We ensure timely and secure delivery of your orders. Our shipping
          process is designed to provide the best experience.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Processing Time
        </h3>
        <p className="text-lg text-[#8B6844]">
          Orders are processed within 2-3 business days. Custom and handwoven
          orders may take longer.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Shipping Charges
        </h3>
        <p className="text-lg text-[#8B6844]">
          We offer free shipping on domestic orders above ₹5,000. International
          shipping charges apply as per location.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Tracking
        </h3>
        <p className="text-lg text-[#8B6844]">
          Once shipped, you will receive a tracking ID via email/SMS to monitor
          your order status.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
