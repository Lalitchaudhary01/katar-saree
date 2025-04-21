const collections = [
  {
    id: 0,
    title: "Katan Kora Booti Sona Rupa Banarasi Silk Saree in Red",
    images: [
      "https://ik.imagekit.io/yg3bo4zvy/bg/red%20saree%201.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/red%20saree%202.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/red%20saree%203.jpg",
    ],
    desc: "A rich Katan Kora Booti Banarasi silk saree in vibrant red with traditional Kadhwa weave. Handcrafted with pure tested Sona Rupa zari, this masterpiece takes 3–4 weeks to complete.",
    originalPrice: 24999,
    discountPrice: 22999,
    discount: "10% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red"],
    stock: 6,
    details: {
      color: "Red",
      technique: "Kadhwa weaving with pure tested Sona Rupa Zari",
      fabric: "Pure Katan Kora Silk – 100% Silk Mark Certified",
      speciality: `
        1. 100% Handwoven: Every single thread is handcrafted with love and takes 3–4 weeks to finish.
        2. Made with Pure Tested Zari: Authentic Sona Rupa (Gold & Silver) Zari.
        3. Kadhwa Technique: No cutwork – traditional handloom technique for intricate bootis.
        4. Zari Life Guarantee: We give 100 years of assurance on our zari life – no one else claims this.
        5. First Time Buyer Offer: Extra 10% discount on your first purchase.
        6. Free Shipping: Across India, and international shipping on orders above ₹20,000.
        7. Silk Mark Certified: All sarees lab tested and certified for purity.
        8. Trusted Since 1956: Katan Banaras – one of the oldest & most reliable Banarasi silk saree brands.
      `,
    },
  },
  // {
  //   id: 0,
  //   title: "Pure Bandhani Saree in Vibrant Lime Green and Deep Bottle Green",
  //   images: [
  //     "https://ik.imagekit.io/yg3bo4zvy/images/Pure_bandhani_saree_lime_green_3.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/Pure_bandhani_saree_lime_green_4.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/Pure_bandhani_saree_lime_green_5.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/Pure_bandhani_saree_lime_green_6.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/Pure_bandhani_saree_lime_green_2.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/Pure_bandhani_saree_lime_green_1.jpg",
  //   ],
  //   desc: "Every single thread is handwoven. It takes 3 to 4 weeks to craft one of these masterpieces. A reflection of timeless tradition and unmatched artistry.",
  //   originalPrice: 22999,
  //   discountPrice: 15999,
  //   discount: "30% OFF",
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Lime Green", "Bottle Green"],
  //   stock: 10,
  //   details: {
  //     color: "Vibrant lime green and deep bottle green",
  //     technique: "Tie-and-Dye Bandhani with traditional craftsmanship",
  //     fabric: "Available in Silk, Cotton, Georgette, and Chiffon",
  //     speciality: `
  //       1. Tie-and-Dye Technique: Bandhani involves tying small portions of fabric with thread and dyeing them to create unique patterns.
  //       2. Vibrant Colors: Bright shades like red, yellow, green, and blue with striking contrasts.
  //       3. Intricate Patterns: Features dots, waves, floral motifs, and regionally significant designs.
  //       4. Handcrafted Artistry: Hand-done by skilled artisans, making each saree one-of-a-kind.
  //       5. Cultural Symbolism: Worn during festivals, weddings, and religious occasions.
  //       6. Variety of Fabrics: Suitable for all preferences and events.
  //     `,
  //   },
  // },
  // {
  //   id: 1,
  //   title: "Katan Jangla Banarasi Saree in Royal Purple",
  //   images: [
  //     "https://ik.imagekit.io/yg3bo4zvy/images/katan-jangla-banarasi-1.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/katan-jangla-banarasi-2.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/katan-jangla-banarasi-3.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/katan-jangla-banarasi-4.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/katan-jangla-banarasi-5.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/katan-jangla-banarasi-6.jpg",
  //     "https://ik.imagekit.io/yg3bo4zvy/images/katan-jangla-banarasi-7.jpg",
  //   ],
  //   desc: "This is a stunning Katan Jangla Banarasi saree in a rich royal purple shade, featuring all-over Sona Roopa zari floral weaving...",
  //   originalPrice: 24999,
  //   discountPrice: 17999,
  //   discount: "28% OFF",
  //   sizes: ["S", "M", "L", "XL"],
  //   colors: ["Royal Purple", "Gold"],
  //   stock: 8,
  //   details: {
  //     color: "Royal Purple",
  //     technique: "Jangla style weaving with Sona Roopa Zari",
  //     fabric: "Pure Katan Silk – 100% Silk Mark Certified",
  //     speciality: `
  //       1. Signature Jangla Weave: All-over intricate floral designs with rich zari work.
  //       2. Pure Katan Silk: Luxurious shine and texture that speaks royalty.
  //       3. Regal Zari Border & Pallu: Heavy Sona Roopa zari adding a grand traditional essence.
  //       4. 100% Handwoven: Takes 3–4 weeks to weave a single piece with absolute precision.
  //       5. Silk Mark Certified: Guaranteed purity and authenticity of silk.
  //       6. Versatile Appeal: Perfect for weddings, festivals, or timeless collection additions.
  //     `,
  //   },
  // },
  {
    id: 1,
    title: "Moonga Silk Pure Banarasi Handloom Saree in Strawberry (Dark)",
    images: [
      "https://ik.imagekit.io/yg3bo4zvy/bg/baby%20pink%20saree%201.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/baby%20pink%20saree%202.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/baby%20pink%20saree%203.jpg",
    ],
    desc: "Elegant Moonga silk Banarasi handloom saree in rich strawberry (dark) shade. Crafted with pure tested gold zari, this masterpiece takes 2–3 weeks to complete.",
    originalPrice: 15499,
    discountPrice: 13499,
    discount: "13% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Strawberry (Dark)"],
    stock: 8,
    details: {
      color: "Strawberry (Dark)",
      technique: "Traditional Banarasi Handloom with Pure Tested Gold Zari",
      fabric: "Pure Moonga Silk – 100% Silk Mark Certified",
      speciality: `
        1. Handcrafted Excellence: 2–3 weeks of detailed, expert weaving.
        2. 100% Pure Gold Zari: Verified and lab-tested for premium quality.
        3. Lifetime Zari Assurance: 100-year guarantee – a promise only we deliver.
        4. Silk Mark Certified: Every saree is lab tested and certified for purity.
        5. Free Shipping: Pan India and international orders over ₹20,000.
        6. Katan Banaras Legacy: Manufacturing since 1956 – a name you can rely on.
      `,
    },
  },

  {
    id: 2,
    title: "Moonga Silk Pure Banarasi Handloom Saree in Gold",
    images: [
      "https://ik.imagekit.io/yg3bo4zvy/bg/yellow%20saree%201.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/yellow%20saree%202.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/yellow%20saree%203.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/yellow%20saree%204.jpg",
    ],
    desc: "This exquisite Moonga silk Banarasi handloom saree in a rich gold hue is woven using 100% pure tested gold zari. A true masterpiece crafted over 2–3 weeks by skilled artisans.",
    originalPrice: 15499,
    discountPrice: 13499,
    discount: "13% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gold"],
    stock: 10,
    details: {
      color: "Gold",
      technique:
        "Traditional Banarasi handloom weaving with 100% pure gold zari",
      fabric: "Pure Moonga Silk – 100% Silk Mark Certified",
      speciality: `
        1. Authentic Pure Moonga Silk: Rich texture and natural sheen, lab tested and certified.
        2. 100% Handwoven: Every thread is crafted by hand, taking 2–3 weeks to complete.
        3. Pure Tested Gold Zari: Backed by a 100-year zari life guarantee, unmatched in the market.
        4. Free Shipping: Across India, and international on orders above ₹20,000.
        5. Brand Legacy: Katan Banaras – A trusted Banarasi silk brand since 1956.
        6. Certified Quality: Every saree is Silk Mark certified and thoroughly lab tested.
      `,
    },
  },

  {
    id: 3,
    title: "Khaddi Georgette Banarasi Bandhani Handloom Saree in Gray",
    images: [
      "https://ik.imagekit.io/yg3bo4zvy/bg/1.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/2.jpg",
      "https://ik.imagekit.io/yg3bo4zvy/bg/3.jpg",
    ],
    desc: "An elegant Khaddi Georgette Banarasi handloom saree in a soothing gray tone featuring intricate Bandhani (Bandhej) work with Minakari accents and 100% pure tested zari. Handwoven to perfection over 3–4 weeks.",
    originalPrice: 19999,
    discountPrice: 15999,
    discount: "20% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray"],
    stock: 6,
    details: {
      color: "Gray",
      technique:
        "Traditional Bandhani with Minakari and Banarasi handloom weaving",
      fabric: "Pure Khaddi Georgette Silk – 100% Silk Mark Certified",
      speciality: `
        1. Unique Bandhani (Bandhej) Art: Crafted with intricate tie-dye technique.
        2. Pure Tested Zari with Minakari: Enhanced beauty with colorful detailing.
        3. 100% Handwoven: Takes 3–4 weeks to handcraft each masterpiece.
        4. 100-Year Zari Guarantee: A claim unmatched in the market, showcasing authenticity.
        5. Free Shipping: Pan-India, and international on orders above ₹20,000.
        6. Legacy of Trust: From Katan Banaras – crafting pure Banarasi silk sarees since 1956.
        7. Certified Purity: Silk Mark and lab-tested assurance on every piece.
      `,
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
