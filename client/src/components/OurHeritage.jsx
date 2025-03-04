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
            timeless art of Banarasi textiles
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
                  Since 1952
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
              For over seven decades, Katan Banaras has been synonymous with the
              finest handwoven Banarasi textiles. Our journey began in the
              narrow lanes of Varanasi, where our founder mastered the art of
              creating exquisite silk sarees under the guidance of master
              weavers.
            </p>
            <p className="font-secondary text-neutral-600 mb-8 leading-relaxed">
              Each piece in our collection represents hours of meticulous
              craftsmanship, with techniques passed down through generations. We
              work directly with artisan families, ensuring both the
              preservation of this ancient art form and sustainable livelihoods
              for our craftspeople.
            </p>

            <div className="mb-10 grid grid-cols-2 gap-4 text-[#bd7e1f]">
              <FeatureItem
                icon="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                title="Handcrafted Excellence"
                description="Each piece meticulously created by our master artisans"
              />
              <FeatureItem
                icon="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                title="Ethical Sourcing"
                description="Pure materials sourced responsibly"
              />
            </div>

            <div className="flex space-x-4">
              <a
                href="#our-story"
                className="inline-block bg-[#8B6A37] text-primary font-secondary px-6 py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300 text-sm tracking-wider"
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
                Founded by Sri Kailash Prasad in the heart of Varanasi with just
                two looms.
              </p>
            </div>
            <div></div> {/* Empty div for alignment */}
            <div></div> {/* Empty div for alignment */}
            <div className="text-right">
              <h4 className="text-[#8B6A37] font-semibold text-lg">
                Expansion
              </h4>
              <p className="text-gray-700">
                Expanded to 20 looms and began collaborating with master weavers
                from across Uttar Pradesh.
              </p>
            </div>
            <div className="text-left">
              <h4 className="text-[#8B6A37] font-semibold text-lg">
                National Recognition
              </h4>
              <p className="text-gray-700">
                Received the National Award for Master Craftsman from the
                President of India.
              </p>
            </div>
            <div></div> {/* Empty div for alignment */}
            <div></div> {/* Empty div for alignment */}
            <div className="text-right">
              <h4 className="text-[#8B6A37] font-semibold text-lg">
                Global Presence
              </h4>
              <p className="text-gray-700">
                Launched international shipping and opened our first
                international boutique in London.
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
