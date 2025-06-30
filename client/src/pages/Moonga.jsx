// Moonga.jsx
import React from "react";
import BanarasiSarees from "./BanarasiSarees";

// Importing the Moonga Silk collection
import moonga from "../assets/product/Moongo";

const Moonga = () => {
  return (
    <BanarasiSarees
      initialProducts={moonga}
      pageTitle="Moonga Silk Collection"
      pageDescription="Timeless Moonga Silk sarees with certified zari work and exquisite handloom artistry. Ideal for weddings, festivities, and elegant occasions."
    />
  );
};

export default Moonga;
