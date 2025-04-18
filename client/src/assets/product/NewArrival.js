const newArrivals = [
  {
    id: 9,
    title: "Katan Kora Booti Sona Rupa Banarasi Silk Saree in Black",
    images: [
      "/images/black.jpg",
      "/images/black2.jpg",

      "/images/black4.jpg",

      "/images/black3.jpg",
      "/images/black6.jpg",
      "/images/black5.jpg",
    ],
    desc: "A majestic Katan Kora Booti Banarasi silk saree in a striking black shade, featuring traditional Kadhwa technique and rich Sona Rupa (gold & silver) zari. It takes 3–4 weeks to handcraft each luxurious piece.",
    originalPrice: 24999,
    discountPrice: 22999,
    discount: "8% OFF + Extra 10% on First Purchase",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 5,
    details: {
      color: "Black",
      technique: "Kadhwa weaving with Sona Rupa (Gold & Silver) Zari",
      fabric: "Pure Katan Kora Silk – 100% Silk Mark Certified",
      speciality: `
        1. Timeless Kadhwa Weave: Detailed bootis woven without cutwork.
        2. Sona Rupa Zari: Crafted using pure gold and silver tested zari.
        3. Pure Handloom: 100% handwoven, taking 3–4 weeks per saree.
        4. Exclusive Zari Life Guarantee: 100 years of assurance – unmatched in the market.
        5. First Time Buyer Offer: Additional 10% discount on your first purchase.
        6. Free Shipping: Available across India and international orders over ₹20,000.
        7. Silk Mark Certified: Authenticity backed by lab testing and certification.
        8. Trusted Since 1956: Katan Banaras – heritage brand for pure Banarasi silk sarees.
      `,
    },
  },

  {
    id: 10,
    title: "Katan Kadhwa Buta Pure Banarasi Silk Saree in Royal Blue",
    images: [
      "/images/kadhwabuta_royalblue1.jpg",
      "/images/kadhwabuta_royalblue2.jpg",
      "/images/kadhwabuta_royalblue3.jpg",
      "/images/kadhwabuta_royalblue4.jpg",
      "/images/kadhwabuta_royalblue5.jpg",
      "/images/kadhwabuta_royalblue6.jpg",
      "/images/kadhwabuta_royalblue7.jpg",
      "/images/kadhwabuta_royalblue8.jpg",
    ],
    desc: "A luxurious Katan Kadhwa Buta Banarasi silk saree in royal blue, handwoven with the finest gold zari using the traditional Kadhwa technique. A masterpiece that takes 3–4 weeks to complete, ensuring timeless elegance.",
    originalPrice: 29999,
    discountPrice: 26999,
    discount: "10% OFF + Extra 10% on First Purchase",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Royal Blue"],
    stock: 4,
    details: {
      color: "Royal Blue",
      technique: "Traditional Kadhwa weaving with pure gold zari",
      fabric: "Pure Katan Silk – 100% Silk Mark Certified",
      speciality: `
        1. Elegant Buta Motifs: Finely detailed gold zari buta patterns.
        2. Pure Gold Tested Zari: Guaranteed purity and intricate finish.
        3. Handwoven Excellence: Crafted over 3–4 weeks by skilled artisans.
        4. Unmatched Zari Life: Backed by a 100-year guarantee on zari durability.
        5. Exclusive First Purchase Offer: Enjoy an extra 10% off.
        6. Free Shipping: Across India and internationally on orders above ₹20,000.
        7. Silk Mark Certified: Lab-tested authenticity of every saree.
        8. Legacy Craftsmanship: From Katan Banaras – trusted since 1956.
      `,
    },
  },

  {
    id: 11,
    title: "Classic Red Banarasi Silk",
    images: ["/images/IMG-20250222-WA0002_5000x.jpg", "/images/red2.jpg"],
    desc: "An elegant red Banarasi silk saree with golden zari motifs, perfect for weddings and festivals.",
    originalPrice: 22999,
    discountPrice: 19999, // ₹19,999
    discount: "13% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Gold"],
    stock: 6,
  },
  {
    id: 12,
    title: "Sapphire Blue Satin Georgette",
    images: [
      "/images/sapphire1.jpg",
      "/images/sapphire2.jpg",
      "/images/sapphire3.jpg",
    ],
    desc: "A luxurious satin georgette saree in sapphire blue, enhanced with crystal embellishments.",
    originalPrice: 14999,
    discountPrice: 12999, // ₹12,999
    discount: "13% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sapphire Blue", "Silver"],
    stock: 12,
  },
  {
    id: 13,
    title: "Ivory White Chikankari Saree",
    images: ["/images/white1.jpg", "/images/white2.jpg"],
    desc: "Pure white Lucknowi Chikankari saree with fine hand embroidery, making it a timeless masterpiece.",
    originalPrice: 17999,
    discountPrice: 14999, // ₹14,999
    discount: "17% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Beige"],
    stock: 7,
  },
  {
    id: 14,
    title: "Blush Pink Soft Silk Saree",
    images: ["/images/blush1.jpg", "/images/blush2.jpg", "/images/blush3.jpg"],
    desc: "A delicate blush pink soft silk saree with silver zari work, ideal for an elegant evening look.",
    originalPrice: 19999,
    discountPrice: 16999, // ₹16,999
    discount: "15% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blush Pink", "Silver"],
    stock: 9,
  },
  {
    id: 15,
    title: "Turquoise Paithani Silk",
    images: ["/images/turquoise1.jpg", "/images/turquoise2.jpg"],
    desc: "Traditional Maharashtrian Paithani silk saree in turquoise, featuring a vibrant peacock motif border.",
    originalPrice: 24999,
    discountPrice: 21999, // ₹21,999
    discount: "12% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Turquoise", "Gold", "Green"],
    stock: 5,
  },
  {
    id: 16,
    title: "Golden Beige Tussar Silk",
    images: ["/images/tussar1.jpg", "/images/tussar2.jpg"],
    desc: "A natural Tussar silk saree in golden beige with minimal hand block print for an understated look.",
    originalPrice: 16999,
    discountPrice: 13999, // ₹13,999
    discount: "18% OFF",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Golden Beige", "Brown"],
    stock: 11,
  },
];

export default newArrivals;
