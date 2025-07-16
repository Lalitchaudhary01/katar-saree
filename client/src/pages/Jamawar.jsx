import React from "react";
import BanarasiSarees from "./BanarasiSarees";
import tanchuiProducts from "../assets/product/Jamawar";

const Jamawar = () => {
  return (
    <BanarasiSarees
      initialProducts={tanchuiProducts}
      pageTitle="Tanchui Silk Collection"
      pageDescription="Exquisite Tanchui Silk sarees with intricate weaves and rich colors. Perfect for weddings, festivals, and special occasions."
    />
  );
};

export default Jamawar;
