// KoraKadhwaStrips.jsx
import React from "react";
import BanarasiSarees from "./BanarasiSarees";

// Dummy data for Kora Kadhwa Strips
import koraKadhwaStripsData from "../assets/product/KoraKadhwaStrips";

const KoraKadhwaStrips = () => {
  return (
    <BanarasiSarees
      initialProducts={koraKadhwaStripsData}
      pageTitle="Kora Kadhwa Strips Collection"
      pageDescription="Exquisite Kora silk sarees with traditional Kadhwa strip weaving technique, featuring intricate patterns and luxurious finish"
    />
  );
};

export default KoraKadhwaStrips;
