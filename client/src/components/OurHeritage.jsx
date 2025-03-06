import React from "react";

const OurHeritage = () => {
  return (
    <section id="our-heritage" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-primary text-3xl md:text-4xl text-secondary mb-4 text-[#8B6A37]">
            Our Heritage
          </h2>
          <p className="font-secondary text-neutral-600">
            A legacy of craftsmanship spanning generations, preserving the
            timeless art of Banarasi textiles.
          </p>
          <div className="w-24 h-0.5 bg-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate__animated animate__fadeInLeft">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-accent opacity-60"></div>
              <img
                src="https://source.unsplash.com/random/800x1000/?weaver,silk,india"
                alt="Traditional Banarasi Weaving"
                className="w-full h-auto object-cover shadow-lg relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-accent opacity-60"></div>

              <div className="absolute bottom-6 left-6 bg-primary p-4 shadow-lg bg-[#FAF3E0]">
                <p className="text-secondary font-primary text-xl">
                  Since 1956
                </p>
                <p className="text-accent font-secondary text-sm mt-1">
                  Preserving tradition
                </p>
              </div>
            </div>
          </div>

          <div className="animate__animated animate__fadeInRight">
            <h3 className="font-primary text-2xl md:text-3xl text-secondary mb-6 text-[#8B6A37]">
              A Legacy of Artistry
            </h3>
            <p className="font-secondary text-neutral-600 mb-6 leading-relaxed">
              For over six decades, Katan Banaras has been a symbol of elegance,
              carrying forward the rich heritage of Banarasi handloom weaving.
              Founded in 1956 by Haji Usman Ali, a master weaver, our legacy
              began in the heart of Varanasi’s weaving community. His dedication
              to authenticity and intricate craftsmanship laid the foundation
              for what we are today
            </p>
            <p className="font-secondary text-neutral-600 mb-8 leading-relaxed">
              Today, under the leadership of the third generation—Mohammed
              Sadique Ansari and Mohammed Shahid Ansari—Katan Banaras continues
              to celebrate the unmatched beauty of handwoven silk. Every saree,
              suit, and dupatta we create tells a story of tradition, precision,
              and artistry..
            </p>
            <p className="font-secondary text-neutral-600 mb-8 leading-relaxed">
              We are proud to ensure that every Katan Banaras creation is{" "}
              <b>
                100% pure, Silk Mark certified, and lab tested for authenticity
              </b>
              . Our Zari work carries a <b>100-year guarantee</b>, making each
              piece an heirloom for generations to come.
            </p>

            <div className="mb-10 grid grid-cols-2 gap-4 text-[#bd7e1f]">
              <FeatureItem
                icon="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                title="Handcrafted Excellence"
                description="Each saree is meticulously woven by master artisans, preserving age-old techniques."
              />
              <FeatureItem
                icon="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                title="Ethical Sourcing"
                description="We source only the finest silk and materials, ensuring sustainable and responsible craftsmanship."
              />
            </div>

            <div className="flex space-x-4">
              <a
                href="#our-story"
                className="inline-block bg-[#8B6A37] text-white text-primary font-secondary px-6 py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300 text-sm tracking-wider"
              >
                Our Story
              </a>
              <a
                href="#craftsmanship"
                className="inline-block border border-[#8B6A37] text-neutral-600 font-secondary px-6 py-2 rounded-sm hover:bg-secondary hover:bg-opacity-10 transition-all duration-300 text-sm tracking-wider"
              >
                Our Craftsmanship
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 bg-accent bg-opacity-5 p-6 md:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-full pattern-bg opacity-5"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#8B6A37]">
              <FeatureCard
                icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                title="Master Craftsmanship"
                description="Our artisans train for decades to perfect the intricate techniques required for creating authentic Banarasi textiles."
              />
              <FeatureCard
                icon="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                title="Heritage Designs"
                description="Our designs draw inspiration from the rich architectural heritage of Varanasi and ancient Indian textile traditions."
              />
              <FeatureCard
                icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                title="Sustainable Practices"
                description="We are committed to ethical production methods and supporting the weaver communities that are the backbone of our heritage."
              />
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="font-primary text-2xl md:text-3xl text-[#8B6A37] mb-8">
            Our Timeline
          </h3>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-left">
              <h4 className="text-[#8B6A37] font-semibold text-lg">
                Establishment
              </h4>
              <p className="text-gray-700">
                Founded by <b>Haji Usman Ali</b> in the heart of Varanasi, Katan
                Banaras began as a small weaving unit dedicated to crafting pure
                Banarasi handloom sarees.
              </p>
            </div>
            <div></div> {/* Empty div for alignment */}
            <div></div> {/* Empty div for alignment */}
            <div className="text-right">
              <h4 className="text-[#8B6A37] font-semibold text-lg">
                Growth & Legacy
              </h4>
              <p className="text-gray-700">
                Under the leadership of <b>Haji Mohammad Zakir</b>, the brand
                expanded, collaborating with skilled artisans to preserve the
                authenticity of Banarasi textiles.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-[#8B6A37] font-semibold text-lg">
                Global Reach
              </h4>
              <p className="text-gray-700">
                With <b>Ansar Silk Export</b>, our parent company, we began
                exporting premium Banarasi fabrics and garments worldwide,
                showcasing India's rich textile heritage on a global stage.
              </p>
            </div>
            <div></div> {/* Empty div for alignment */}
            <div></div> {/* Empty div for alignment */}
            <div className="text-right">
              <h4 className="text-[#8B6A37] font-semibold text-lg">
                A New Era
              </h4>
              <p className="text-gray-700">
                Now led by the third generation—
                <b>Mohammed Sadique Ansari and Mohammed Shahid Ansari</b>—Katan
                Banaras continues to uphold its legacy while embracing
                innovation in design and craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start">
    <div className="bg-accent bg-opacity-10 p-2 rounded-sm mr-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d={icon}
        />
      </svg>
    </div>
    <div>
      <h4 className="font-primary text-lg text-secondary mb-1">{title}</h4>
      <p className="font-secondary text-neutral-600 text-sm">{description}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center animate__animated animate__fadeIn">
    <div className="inline-block bg-accent bg-opacity-10 p-4 rounded-full mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d={icon}
        />
      </svg>
    </div>
    <h3 className="font-primary text-xl text-secondary mb-3">{title}</h3>
    <p className="font-secondary text-neutral-600">{description}</p>
  </div>
);

const TimelineItem = ({ year, title, description, alignRight = false }) => (
  <div
    className={`flex flex-col md:flex-row items-center md:justify-between mb-16 timeline-item animate__animated animate__fadeIn ${
      alignRight ? "md:flex-row-reverse" : ""
    }`}
  >
    <div className="md:w-5/12 text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
      {!alignRight && (
        <>
          <h4 className="font-primary text-xl text-secondary mb-2">{title}</h4>
          <p className="font-secondary text-neutral-600">{description}</p>
        </>
      )}
    </div>
    <div className="mx-auto md:mx-0 order-1 md:order-2 mb-4 md:mb-0">
      <div className="bg-accent text-white font-primary text-xl py-2 px-4 rounded-sm">
        {year}
      </div>
    </div>
    <div className="md:w-5/12 md:pl-8 text-left mb-4 md:mb-0 order-3">
      {alignRight && (
        <>
          <h4 className="font-primary text-xl text-secondary mb-2">{title}</h4>
          <p className="font-secondary text-neutral-600">{description}</p>
        </>
      )}
    </div>
  </div>
);

export default OurHeritage;
