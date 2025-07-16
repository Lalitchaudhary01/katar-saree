import React from "react";
import BanarasiSarees from "./BanarasiSarees";
import katanSilkProducts from "../assets/product/silk";

const Katansilk = () => {
  return (
    <BanarasiSarees
      initialProducts={katanSilkProducts}
      pageTitle="Katan Silk Collection"
      pageDescription="Exquisite Katan silk sarees featuring intricate zari work and traditional handloom craftsmanship. Perfect for weddings, celebrations, and special occasions."
    />
  );
};

export default Katansilk;
