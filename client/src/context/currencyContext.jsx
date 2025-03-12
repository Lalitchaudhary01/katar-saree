import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create context
const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [showCurrency, setShowCurrency] = useState(false);
  const [conversionRates, setConversionRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
  });

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  ];

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/2dfa68fb074350b0aae3a4b9/latest/INR"
        );
        setConversionRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchConversionRates();
  }, []);

  const convertPrice = (priceInINR) => {
    if (!priceInINR || !conversionRates[selectedCurrency.code]) return null;
    const rate = conversionRates[selectedCurrency.code];
    const convertedPrice = priceInINR * rate;
    return Math.round(convertedPrice * 100) / 100;
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const handleCurrencyClick = () => {
    setShowCurrency(!showCurrency);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setShowCurrency(false);
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        currencies,
        showCurrency,
        convertPrice,
        formatPrice,
        handleCurrencySelect,
        handleCurrencyClick,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
