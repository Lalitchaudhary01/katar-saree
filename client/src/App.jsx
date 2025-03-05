import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster
import "./App.css";
import Craftsmanship from "./components/Craftsmanship";
import FeaturedCollections from "./components/FeaturedCollections";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewArrivals from "./components/NewArrivals";
import OurHeritage from "./components/OurHeritage";
import Cart from "./components/Cart"; // Import the Cart component
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Checkout from "./components/Checkout";
import CollectionDetails from "./components/CollectionDetails";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />{" "}
        {/* Toast Notification */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <FeaturedCollections />
                <NewArrivals />
                <OurHeritage />
                <Craftsmanship />
              </>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/collection/:id" element={<CollectionDetails />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
