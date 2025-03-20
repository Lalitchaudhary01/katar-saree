import React from "react";
import { Scroll, Award, Check } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-[#F0EAE0] to-[#E0D0B0] py-20 px-6 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto text-center bg-white shadow-xl rounded-xl p-12 border border-[#D6B792] relative">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D6B792]"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#D6B792]"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#D6B792]"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D6B792]"></div>

        {/* Logo icon */}
        <div className="mb-8 flex justify-center">
          <Scroll size={40} className="text-[#8B6844]" />
        </div>

        <h2 className="text-5xl font-serif font-bold text-black mb-8">
          Our Heritage
        </h2>

        <p className="text-xl text-black leading-relaxed mb-10 font-light">
          <span className="italic font-medium text-black">Katan Banaras</span>{" "}
          is not just a brand; it is a tradition, a timeless legacy of handwoven
          artistry that began in 1956 with <strong>Haji Usman Ali</strong>. A
          master weaver and visionary, he laid the foundation of this heritage,
          passing down the intricate craftsmanship of Banarasi handloom sarees
          through generations.
        </p>

        <div className="border-t-2 border-[#D6B792] my-12 w-1/3 mx-auto"></div>

        <h3 className="text-4xl font-serif text-black mb-6">
          A Legacy Woven in Time
        </h3>

        <p className="text-xl text-black leading-relaxed mb-8 font-light">
          From one generation to the next, this sacred art of weaving has been
          preserved with utmost dedication and reverence:
        </p>

        <div className="text-xl text-black bg-[#F9F6F0] p-8 rounded-lg shadow-sm border border-[#E5D1B8] mb-8">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#F0EAE0] flex items-center justify-center">
                <span className="font-serif text-2xl text-[#8B6844]">I</span>
              </div>
              <p className="font-light">
                <span className="font-medium">Founder:</span> Haji Usman Ali
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#F0EAE0] flex items-center justify-center">
                <span className="font-serif text-2xl text-[#8B6844]">II</span>
              </div>
              <p className="font-light">
                <span className="font-medium">Successor:</span> Haji Mohammad
                Zakir
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#F0EAE0] flex items-center justify-center">
                <span className="font-serif text-2xl text-[#8B6844]">III</span>
              </div>
              <p className="font-light">
                <span className="font-medium">Present Torchbearers:</span>{" "}
                Mohammed Sadique Ansari & Mohammed Shahid Ansari
              </p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-[#D6B792] my-12 w-1/3 mx-auto"></div>

        <h3 className="text-4xl font-serif text-black mb-6">
          Our Promise of Authenticity
        </h3>

        <p className="text-xl text-black leading-relaxed mb-10 font-light">
          Every thread woven at{" "}
          <span className="font-medium">Katan Banaras</span> carries the soul of
          Banaras, the artistry of our forefathers, and the legacy of over a
          century of craftsmanship.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#F9F6F0] p-6 rounded-lg border border-[#E5D1B8]">
            <div className="flex justify-center mb-4">
              <Award size={28} className="text-[#8B6844]" />
            </div>
            <p className="text-black font-light">
              <span className="font-medium">Silk Mark Certified</span> for
              absolute authenticity
            </p>
          </div>

          <div className="bg-[#F9F6F0] p-6 rounded-lg border border-[#E5D1B8]">
            <div className="flex justify-center mb-4">
              <Check size={28} className="text-[#8B6844]" />
            </div>
            <p className="text-black font-light">
              <span className="font-medium">Laboratory Tested</span> for premium
              quality
            </p>
          </div>

          <div className="bg-[#F9F6F0] p-6 rounded-lg border border-[#E5D1B8]">
            <div className="flex justify-center mb-4">
              <Award size={28} className="text-[#8B6844]" />
            </div>
            <p className="text-black font-light">
              <span className="font-medium">100-Year Guarantee</span> on zari
              craftsmanship
            </p>
          </div>
        </div>

        <div className="border-t-2 border-[#D6B792] my-12 w-1/3 mx-auto"></div>

        <h3 className="text-4xl font-serif text-black mb-6">
          The Vision Lives On
        </h3>

        <p className="text-xl text-black leading-relaxed mb-10 font-light">
          What began as a humble weaving unit has today become a symbol of
          heritage and authenticity. The vision of our grandfather, carried
          forward by our father, is now in the hands of the third generation—
          <span className="font-medium">Sadique Ansari and Shahid Ansari</span>.
          We remain devoted to preserving and sharing the timeless beauty of
          Banarasi craftsmanship with the world.
        </p>

        <div className="text-xl text-black italic mt-8 bg-[#F9F6F0] p-8 rounded-lg shadow-sm border border-[#E5D1B8] font-serif">
          Every saree, every dupatta, every suit is not just fabric—it is a
          legacy, a piece of history, a treasure to be cherished for generations
          to come.
        </div>

        {/* Signature element */}
        <div className="mt-12 font-serif italic text-[#8B6844] text-lg">
          — The House of Katan Banaras —
        </div>
      </div>
    </div>
  );
};

export default About;
