import React from "react";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-[#E5D1B8] to-[#F7F1E5] py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10 border border-[#D6B792]">
        <h2 className="text-4xl font-bold text-[#7A5520] text-center mb-6">
          Contact Us
        </h2>
        <p className="text-lg text-[#6A4A2D] text-center mb-8">
          Have questions or need assistance? Feel free to reach out. Our team is
          always here to help!
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-[#7A5520] text-lg font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-[#D6B792] rounded-lg focus:ring-2 focus:ring-[#7A5520] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#7A5520] text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-[#D6B792] rounded-lg focus:ring-2 focus:ring-[#7A5520] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#7A5520] text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full p-3 border border-[#D6B792] rounded-lg focus:ring-2 focus:ring-[#7A5520] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7A5520] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#5A3E15] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
