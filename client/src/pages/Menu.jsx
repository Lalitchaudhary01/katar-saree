import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BanarasiSarees from "./BanarasiSarees";
import banarasiProducts from "../assets/product/BanarasiProduct";

const Menu = () => {
  const { routeCategory } = useParams();
  const [initialFilteredProducts, setInitialFilteredProducts] =
    useState(banarasiProducts);

  useEffect(() => {
    let filteredProducts = banarasiProducts;

    // Comprehensive filtering logic with more precise categorization
    const categoryMappings = {
      // Trending Routes
      "trending-sarees": (product) =>
        product.tags.includes("Trending") &&
        product.category.toLowerCase().includes("saree"),
      "trending-suits": (product) =>
        product.tags.includes("Trending") &&
        product.category.toLowerCase().includes("suit"),

      // Featured Routes
      silk: (product) =>
        product.category.toLowerCase().includes("silk") &&
        !product.category.toLowerCase().includes("heavy silk"),
      "katan-icon": (product) =>
        product.category.toLowerCase().includes("katan"),
      handwoven: (product) =>
        product.tags.includes("Handwoven") ||
        product.category.toLowerCase().includes("handwoven"),
      "signature-class": (product) => product.tags.includes("Signature"),

      // Collections Routes
      gifts: (product) => product.tags.includes("Gift"),
      "best-sellers": (product) => product.tags.includes("Best Seller"),
      "back-in-stock": (product) => product.tags.includes("Back in Stock"),
      "pre-order": (product) => product.tags.includes("Pre Order"),
      "ready-to-ship": (product) => product.tags.includes("Ready to Ship"),
      "heavy-silk": (product) =>
        product.category.toLowerCase().includes("heavy silk"),
      bridal: (product) => product.tags.includes("Bridal"),
      casual: (product) => product.tags.includes("Casual"),

      // Clothing Routes
      sarees: (product) => product.category.toLowerCase().includes("saree"),
      suits: (product) => product.category.toLowerCase().includes("suit"),
      duputtas: (product) => product.category.toLowerCase().includes("dupatta"),

      // Weaving and Patterns Routes
      "kadhwa-bootis": (product) => product.tags.includes("Kadhwa Bootis"),
      "kadwa-buri": (product) => product.tags.includes("Kadwa Buri"),
      "kadhwa-strips": (product) => product.tags.includes("Kadhwa Strips"),
      "jaal-cutwork": (product) => product.tags.includes("Jaal Cutwork"),
      jamawar: (product) => product.tags.includes("Jamawar"),
      "banarasi-bandhej": (product) =>
        product.tags.includes("Banarasi Bandhej"),
      "minakari-bandhej": (product) =>
        product.tags.includes("Minakari Bandhej"),
      tasal: (product) => product.tags.includes("Tasal Banarasi"),

      // Rare Techniques Routes
      rare: (product) => product.tags.includes("Rare Technique"),
      rankat: (product) => product.tags.includes("Rankat"),
      "bridal-sarees": (product) => product.tags.includes("Bridal"),

      // Fabric Routes
      katan: (product) => product.category.toLowerCase().includes("katan"),
      satin: (product) => product.category.toLowerCase().includes("satin"),
      tissue: (product) => product.category.toLowerCase().includes("tissue"),
      "kora-organza": (product) =>
        product.category.toLowerCase().includes("kora organza"),
      "handwoven-georgette": (product) =>
        product.category.toLowerCase().includes("handwoven georgette"),
      tanchui: (product) => product.category.toLowerCase().includes("tanchui"),

      // Fabric Collections Routes
      wedding: (product) => product.tags.includes("Wedding"),
      festival: (product) => product.tags.includes("Festival"),
      everyday: (product) => product.tags.includes("Everyday"),
      premium: (product) => product.tags.includes("Premium"),

      // Fabric Care Routes
      "care-guide": null,
      storage: null,
      "dry-cleaning": null,
      rejuvenation: null,
    };

    // Special handling for Fabric Care routes
    const fabricCareRoutes = [
      "care-guide",
      "storage",
      "dry-cleaning",
      "rejuvenation",
    ];

    if (fabricCareRoutes.includes(routeCategory)) {
      // Curated selection for fabric care routes
      filteredProducts = banarasiProducts.filter(
        (product) =>
          product.category.toLowerCase().includes("silk") ||
          product.tags.includes("Premium") ||
          product.tags.includes("Handwoven")
      );
    } else {
      // Apply regular filtering
      const filterFn = categoryMappings[routeCategory];

      if (filterFn) {
        filteredProducts = banarasiProducts.filter(filterFn);
      }
    }

    setInitialFilteredProducts(filteredProducts);
  }, [routeCategory]);

  return (
    <BanarasiSarees
      initialProducts={initialFilteredProducts}
      pageTitle={getPageTitle(routeCategory)}
    />
  );
};

// Helper function to get dynamic page title
const getPageTitle = (routeCategory) => {
  const titleMap = {
    // Trending Titles
    "trending-sarees": "Trending Sarees",
    "trending-suits": "Trending Suits",

    // Featured Titles
    silk: "Silk Collection",
    "katan-icon": "Katan Icon Collection",
    handwoven: "Handwoven Fabrics",
    "signature-class": "Katan Signature Class",

    // Collections Titles
    gifts: "Gift Collection",
    "best-sellers": "Best Selling Sarees",
    "back-in-stock": "Back in Stock",
    "pre-order": "Pre Order Collection",
    "ready-to-ship": "Ready to Ship",
    "heavy-silk": "Heavy Silk Collection",
    bridal: "Bridal Collection",
    casual: "Casual Collection",

    // Clothing Titles
    sarees: "Sarees Collection",
    suits: "Suits Collection",
    duputtas: "Dupattas Collection",

    // Weaving and Patterns Titles
    "kadhwa-bootis": "Kadhwa Bootis",
    "kadwa-buri": "Kadwa Buri",
    "kadhwa-strips": "Kadhwa Strips",
    "jaal-cutwork": "Jaal Cutwork",
    jamawar: "Jamawar Collection",
    "banarasi-bandhej": "Banarasi Bandhej",
    "minakari-bandhej": "Minakari Bandhej",
    tasal: "Tasal Banarasi",

    // Rare Techniques Titles
    rare: "Rarest Weaving Techniques",
    rankat: "Rankat Technique",
    "bridal-sarees": "Bridal Sarees",

    // Fabric Titles
    katan: "Katan Silk",
    satin: "Satin Silk",
    tissue: "Tissue Silk",
    "kora-organza": "Kora Organza Silk",
    "handwoven-georgette": "Handwoven Georgette",
    tanchui: "Tanchui Fabric",

    // Fabric Collections Titles
    wedding: "Wedding Fabrics",
    festival: "Festival Fabrics",
    everyday: "Everyday Elegance",
    premium: "Premium Weaves",

    // Fabric Care Titles
    "care-guide": "Silk Care Guide",
    storage: "Fabric Storage Tips",
    "dry-cleaning": "Dry Cleaning Guide",
    rejuvenation: "Fabric Rejuvenation Tips",

    default: "Banarasi Sarees Collection",
  };

  return titleMap[routeCategory] || titleMap.default;
};

export default Menu;
