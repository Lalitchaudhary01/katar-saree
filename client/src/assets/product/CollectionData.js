const collections = [
  {
    id: 0,
    title: "Pure Bandhani Saree in Vibrant Lime Green and Deep Bottle Green",
    images: [
      "/images/Pure_bandhani_saree_lime_green_1.JPG",
      "/images/Pure_bandhani_saree_lime_green_2.JPG",
      "/images/Pure_bandhani_saree_lime_green_3.jpg",
      "/images/Pure_bandhani_saree_lime_green_4.jpg",
      "/images/Pure_bandhani_saree_lime_green_5.jpg",
      "/images/Pure_bandhani_saree_lime_green_6.jpg",
    ],
    desc: "Every single thread is handwoven. It takes 3 to 4 weeks to craft one of these masterpieces. A reflection of timeless tradition and unmatched artistry.",
    originalPrice: 22999,
    discountPrice: 15999,
    discount: "30% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Lime Green", "Bottle Green"],
    stock: 10,
    details: {
      color: "Vibrant lime green and deep bottle green",
      technique: "Tie-and-Dye Bandhani with traditional craftsmanship",
      fabric: "Available in Silk, Cotton, Georgette, and Chiffon",
      speciality: `
        1. Tie-and-Dye Technique: Bandhani involves tying small portions of fabric with thread and dyeing them to create unique patterns.
        2. Vibrant Colors: Bright shades like red, yellow, green, and blue with striking contrasts.
        3. Intricate Patterns: Features dots, waves, floral motifs, and regionally significant designs.
        4. Handcrafted Artistry: Hand-done by skilled artisans, making each saree one-of-a-kind.
        5. Cultural Symbolism: Worn during festivals, weddings, and religious occasions.
        6. Variety of Fabrics: Suitable for all preferences and events.
      `,
    },
  },
  {
    id: 1,
    title: "Katan Jangla Banarasi Saree in Royal Purple",
    images: [
      "/images/katan-jangla-banarasi-1.jpg",
      "/images/katan-jangla-banarasi-2.jpg",
      "/images/katan-jangla-banarasi-3.jpg",
      "/images/katan-jangla-banarasi-4.jpg",
      "/images/katan-jangla-banarasi-5.jpg",
    ],
    desc: "This is a stunning Katan Jangla Banarasi saree in a rich royal purple shade, featuring all-over Sona Roopa zari floral weaving...",
    originalPrice: 24999,
    discountPrice: 17999,
    discount: "28% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Royal Purple", "Gold"],
    stock: 8,
    details: {
      color: "Royal Purple",
      technique: "Jangla style weaving with Sona Roopa Zari",
      fabric: "Pure Katan Silk – 100% Silk Mark Certified",
      speciality: `
        1. Signature Jangla Weave: All-over intricate floral designs with rich zari work.
        2. Pure Katan Silk: Luxurious shine and texture that speaks royalty.
        3. Regal Zari Border & Pallu: Heavy Sona Roopa zari adding a grand traditional essence.
        4. 100% Handwoven: Takes 3–4 weeks to weave a single piece with absolute precision.
        5. Silk Mark Certified: Guaranteed purity and authenticity of silk.
        6. Versatile Appeal: Perfect for weddings, festivals, or timeless collection additions.
      `,
    },
  },
  {
    id: 2,
    title: "Pure Cora Silk",
    images: [
      "/images/blue1.jpg",
      "/images/blue2.jpg",
      "/images/blue3.jpg",
      "/images/blue4.jpg",
    ],
    desc: "Navy blue tested silk with silver zari, fully handmade for a luxurious touch.",
    originalPrice: 11999,
    discountPrice: 9999,
    discount: "17% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy Blue", "Teal Blue"],
    stock: 10,
    details: {
      color: "Elegant Navy Blue",
      technique: "Classic Banarasi handwoven artistry with silver zari",
      fabric: "Pure Kora silk net",
      speciality: "A lightweight and wispy drape with intricate detailing.",
    },
  },
  {
    id: 3,
    title: "Pure Khadi Georget Bandhani",
    images: [
      "/images/mashru1.jpg",
      "/images/mashru2.jpg",
      "/images/mashru3.jpg",
      "/images/mashru4.jpg",
    ],
    desc: "A lightweight and breathable saree, easy to carry, perfect for summers.",
    originalPrice: 9999,
    discountPrice: 8999,
    discount: "10% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Pink", "Yellow"],
    stock: 10,
    details: {
      color: "Vibrant Red and Pink hues",
      technique: "Traditional Bandhani hand tie-dyeing",
      fabric: "Pure Khadi Georgette",
      speciality:
        "Soft and breathable, perfect for daily wear and festive occasions.",
    },
  },
  {
    id: 4,
    title: "Banarasi Handloom Saree",
    images: ["/images/black1.jpg", "/images/black2.jpg", "/images/black3.jpg"],
    desc: "Authentic Banarasi handloom saree with intricate weaving, perfect for grand occasions.",
    originalPrice: 19999,
    discountPrice: 17999,
    discount: "10% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gold"],
    stock: 10,
    details: {
      color: "Royal Black with Gold Zari",
      technique: "Pure Banarasi handloom weaving",
      fabric: "Fine silk with heavy zari work",
      speciality:
        "Perfect for weddings and grand celebrations with a regal touch.",
    },
  },
  {
    id: 5,
    title: "Royal Blue Zari Woven Silk",
    images: ["/images/maroon_handloom1.jpg", "/images/maroon_handloom2.jpg"],
    desc: "A royal blue zari woven silk saree with delicate gold patterns, making it an elegant choice.",
    originalPrice: 15999,
    discountPrice: 13999,
    discount: "13% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Royal Blue", "Silver"],
    stock: 10,
    details: {
      color: "Striking Royal Blue",
      technique: "Zari woven silk with gold motifs",
      fabric: "Luxurious silk",
      speciality:
        "An opulent choice with rich detailing for special occasions.",
    },
  },
  {
    id: 6,
    title: "Pink Kanjeevaram Silk Saree",
    images: ["/images/pink1.jpg", "/images/pink2.jpg", "/images/pink3.jpg"],
    desc: "Pure Kanjeevaram silk saree in a gorgeous pink shade, featuring gold zari borders and a luxurious pallu.",
    originalPrice: 27999,
    discountPrice: 24999,
    discount: "11% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Pink", "Gold"],
    stock: 10,
    details: {
      color: "Elegant Pink with Gold Zari",
      technique: "Authentic Kanjeevaram handwoven silk",
      fabric: "Pure Kanjeevaram silk",
      speciality: "A bridal favorite with a rich texture and grand zari work.",
    },
  },
];

export default collections;
