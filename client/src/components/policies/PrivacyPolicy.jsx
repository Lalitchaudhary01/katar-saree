import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-[#E5D1B8] to-[#F7F1E5] py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10 border border-[#D6B792]">
        <h2 className="text-4xl font-bold text-[#7A5520] text-center mb-6">
          Privacy Policy
        </h2>
        <p className="text-lg text-[#6A4A2D] mb-4">
          Your privacy is important to us. We are committed to protecting your
          personal data.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Information We Collect
        </h3>
        <p className="text-lg text-[#8B6844]">
          We collect personal details such as name, email, and address to
          enhance your shopping experience.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          How We Use Your Data
        </h3>
        <p className="text-lg text-[#8B6844]">
          Your data is used for order processing, customer support, and
          promotional updates.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Security Measures
        </h3>
        <p className="text-lg text-[#8B6844]">
          We implement strict security measures to protect your data from
          unauthorized access.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
