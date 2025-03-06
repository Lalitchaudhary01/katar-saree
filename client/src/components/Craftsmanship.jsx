import React from "react";

const Craftsmanship = () => {
  return (
    <section className="py-16 md:py-24 bg-primary bg-opacity-50 bg-[#FAF3E0]">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#8B6A37] mb-4 italic">
            The Art of Craftsmanship
          </h2>
          <p className="font-serif text-neutral-600">
            Discover the meticulous techniques and artistry behind every{" "}
            <b>Katan Banaras</b> creation.
          </p>
          <div className="w-24 h-0.5 bg-accent mx-auto mt-6"></div>
        </div>

        {/* Craftsmanship Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Video Section */}
          <div className="relative animate__animated animate__fadeIn flex justify-center">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-l-2 border-t-2 border-accent opacity-60"></div>
            <div className="relative bg-neutral-100 shadow-xl aspect-video flex items-center justify-center overflow-hidden w-full max-w-[700px]">
              <img
                src="https://source.unsplash.com/random/800x450/?weaving,silk,saree"
                alt="The Art of Banarasi Weaving"
                className="w-full h-full object-cover"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-secondary bg-opacity-30 hover:bg-opacity-20 transition-all duration-300 group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-10 md:w-10 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-2 border-b-2 border-accent opacity-60"></div>
          </div>

          {/* Craftsmanship Description */}
          <div className="animate__animated animate__fadeIn animate__delay-1s max-w-[700px] mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl text-[#8B6A37] mb-6 text-center lg:text-left italic">
              The Weaving Process
            </h3>
            <p className="font-serif text-neutral-700 mb-8 leading-relaxed text-center lg:text-left">
              Every <b>Katan Banaras</b> saree begins with the finest raw
              materials—
              <b>
                {" "}
                pure mulberry silk, handwoven zari with silver and gold, and
                natural dyes
              </b>
              . Our master artisans, carrying forward a legacy that dates back
              to <b>1956</b>, use age-old techniques to craft each saree with
              precision. Depending on the intricacy of the design, a single
              piece can take anywhere from <b>15 days to 6 months</b> to
              complete.
            </p>

            {/* Steps */}
            <div className="space-y-6 mb-8 text-[#8B6A37]">
              <StepItem
                number="1"
                title="Design Creation"
                description="Our designs are deeply inspired by Varanasi's rich heritage, drawing motifs from Mughal-era architecture, sacred temples, and nature. Each pattern is carefully sketched before the weaving begins."
              />
              <StepItem
                number="2"
                title="Yarn Preparation"
                description="We use the finest silk threads, dyed using traditional methods to retain their natural sheen and vibrancy. The process of reeling and warping ensures the silk is ready for the loom."
              />
              <StepItem
                number="3"
                title="Handloom Weaving"
                description="Our artisans work on traditional pit looms, skillfully interweaving silk and zari to create intricate patterns that define authentic Banarasi textiles. Every weave is a reflection of craftsmanship passed down through generations."
              />
            </div>

            <div className="text-center lg:text-left">
              <a
                href="#"
                className="inline-block bg-[#8B6A37] text-white font-serif px-6 py-2 rounded-sm hover:bg-opacity-90 transition-all duration-300 text-sm tracking-wider"
              >
                Explore Our Techniques
              </a>
            </div>
          </div>
        </div>

        {/* Technique Showcase */}
        <div className="bg-white shadow-xl p-6 md:p-10 mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pattern-bg opacity-5"></div>
          <div className="relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl text-[#8B6A37] text-center mb-10 italic">
              Signature Techniques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-[#8B6A37]">
              <TechniqueCard
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdQpv1_ImrM960mWFp7D9fb5DTVNpQRKb0lQ&s"
                title="Kadhua Weaving"
                description="An intricate technique where each motif is individually woven using small shuttles, similar to tapestry weaving."
              />
              <TechniqueCard
                image="https://source.unsplash.com/random/300x300/?brocade,fabric"
                title="Jangla Technique"
                description="Features densely patterned designs where the entire fabric is covered with intricate zari work depicting floral motifs."
              />
              <TechniqueCard
                image="https://source.unsplash.com/random/300x300/?silver,thread"
                title="Minakari Work"
                description="Inspired by enamel work, this technique uses colorful threads on a gold or silver background to create vibrant designs."
              />
              <TechniqueCard
                image="https://source.unsplash.com/random/300x300/?gold,thread,textile"
                title="Cutwork Technique"
                description="Creates a jaali-like effect with intricate patterns where the background appears to be cut out, highlighting the main motifs."
              />
            </div>
          </div>
        </div>

        {/* Artisan Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16">
          <div className="lg:col-span-1 animate__animated animate__fadeInLeft">
            <img
              src="https://source.unsplash.com/random/600x800/?indian,weaver,artisan"
              alt="Master Artisan"
              className="w-full h-auto shadow-lg"
            />
          </div>
          <div className="lg:col-span-2 animate__animated animate__fadeInRight">
            <div className="lg:pl-10">
              <h3 className="font-serif text-2xl md:text-3xl text-[#8B6A37] mb-6 italic">
                Meet Our Master Artisans
              </h3>
              <p className="font-serif text-neutral-700 mb-6 leading-relaxed">
                Behind every Katan Banaras creation is a master artisan with
                decades of experience. Many of our weavers are from families
                that have practiced this art for generations, with techniques
                and knowledge passed down from father to son.
              </p>
              <p className="font-serif text-neutral-700 mb-8 leading-relaxed">
                We take pride in providing sustainable livelihoods for over 150
                artisan families, ensuring that this precious heritage craft
                continues to thrive in an age of machine-made textiles.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 py-2 mb-8">
                <p className="font-serif text-lg text-secondary italic text-[#8B6A37]">
                  "Each thread I weave carries the story of our culture, our
                  heritage, and our identity. When I sit at my loom, I am not
                  just creating a saree; I am preserving a legacy."
                </p>
                <footer className="font-serif text-neutral-600 mt-2">
                  — Raghav Mehta, Master Weaver (35 years of experience)
                </footer>
              </blockquote>
              <a
                href="#"
                className="inline-block border border-secondary text-[#8B6A37] font-serif px-6 py-3 rounded-sm hover:bg-secondary hover:text-primary transition-all duration-300 text-sm tracking-wider"
              >
                Meet Our Artisans
              </a>
            </div>
          </div>
        </div>

        {/* Certification Banner */}
        {/* <div className="bg-accent bg-opacity-10 p-8 md:p-12 text-center relative overflow-hidden animate__animated animate__fadeIn">
          <div className="absolute top-0 left-0 w-full h-full pattern-bg opacity-5"></div>
          <div className="relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl text-[#8B6A37] mb-6 italic">
              GI Certified Authenticity
            </h3>
            <p className="font-serif text-neutral-700 mb-8 max-w-2xl mx-auto">
              Every Katan Banaras creation comes with a Geographical Indication
              (GI) certification, guaranteeing its authentic origin and
              adherence to traditional craftsmanship standards.
            </p>
            <img
              src="https://source.unsplash.com/random/200x100/?certificate,seal"
              alt="GI Certification"
              className="h-20 mx-auto mb-6"
            />
            <a
              href="#"
              className="inline-block bg-[#8B6A37] text-primary font-serif px-6 py-3 rounded-sm hover:bg-opacity-90 transition-all duration-300 text-sm tracking-wider text-white"
            >
              Learn About Our Certifications
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

// Reusable Step Item Component
const StepItem = ({ number, title, description }) => (
  <div className="flex items-start">
    <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-sm flex items-center justify-center mr-4 flex-shrink-0">
      <span className="font-serif text-2xl text-accent">{number}</span>
    </div>
    <div>
      <h4 className="font-serif text-xl text-secondary mb-2">{title}</h4>
      <p className="font-serif text-neutral-600">{description}</p>
    </div>
  </div>
);

// Reusable Technique Card Component
const TechniqueCard = ({ image, title, description }) => (
  <div className="text-center animate__animated animate__fadeIn">
    <div className="relative mb-6 mx-auto w-40 h-40 overflow-hidden rounded-full border border-[#8B6A37] border-opacity-20 shadow-lg">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
      />
    </div>
    <h4 className="font-serif text-xl text-secondary mb-2 italic">{title}</h4>
    <p className="font-serif text-neutral-600 text-sm">{description}</p>
  </div>
);

export default Craftsmanship;
