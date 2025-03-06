import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-[#E5D1B8] to-[#F7F1E5] py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10 border border-[#D6B792]">
        <h2 className="text-4xl font-bold text-[#7A5520] text-center mb-6">
          Return Policy
        </h2>
        <p className="text-lg text-[#6A4A2D] mb-4">
          Your satisfaction is our priority. If you are not happy with your
          purchase, our return policy makes it easy for you.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Eligibility
        </h3>
        <p className="text-lg text-[#8B6844]">
          Returns are accepted within 7 days of delivery. Items must be unused
          and in their original packaging.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Refund Process
        </h3>
        <p className="text-lg text-[#8B6844]">
          Once we receive your return, we will process your refund within 5-7
          business days.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Exchange Policy
        </h3>
        <p className="text-lg text-[#8B6844]">
          We offer free exchanges in case of defects or incorrect orders.
          Contact support for assistance.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
