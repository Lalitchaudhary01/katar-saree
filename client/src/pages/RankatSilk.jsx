import React from "react";
import BanarasiSarees from "./BanarasiSarees";
import rankatProducts from "../assets/product/Rankat"; // 👈 No {}

const RankatSilk = () => {
  return (
    <div>
           {" "}
      <BanarasiSarees
        initialProducts={rankatProducts}
        pageTitle="Rankat Silk Collection"
        pageDescription="Timeless Rankat Silk sarees with certified zari work and exquisite handloom artistry. Ideal for weddings, festivities, and elegant occasions."
      />
         {" "}
    </div>
  );
};

export default RankatSilk;
