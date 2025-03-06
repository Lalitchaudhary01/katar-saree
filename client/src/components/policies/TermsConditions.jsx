import React from "react";

const TermsConditions = () => {
  return (
    <div className="bg-gradient-to-b from-[#E5D1B8] to-[#F7F1E5] py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10 border border-[#D6B792]">
        <h2 className="text-4xl font-bold text-[#7A5520] text-center mb-6">
          Terms & Conditions
        </h2>
        <p className="text-lg text-[#6A4A2D] mb-4">
          By using our website, you agree to abide by our terms and conditions.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Usage Guidelines
        </h3>
        <p className="text-lg text-[#8B6844]">
          You must not misuse our products or services. Any violation may lead
          to termination of access.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Intellectual Property
        </h3>
        <p className="text-lg text-[#8B6844]">
          All content on our website is our intellectual property and cannot be
          used without permission.
        </p>

        <h3 className="text-2xl font-semibold text-[#7A5520] mt-4 mb-2">
          Liability Limitations
        </h3>
        <p className="text-lg text-[#8B6844]">
          We are not responsible for any damages arising from the use of our
          website.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
