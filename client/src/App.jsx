import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Craftsmanship from "./components/Craftsmanship";
import FeaturedCollections from "./components/FeaturedCollections";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewArrivals from "./components/NewArrivals";
import OurHeritage from "./components/OurHeritage";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkout";
import CollectionDetails from "./components/CollectionDetails";
import SilkSarees from "./pages/SilkSaree";
import CottonSarees from "./pages/CottonSarees";
import BanarasiSarees from "./pages/BanarasiSarees";
import About from "./components/About";
import Contact from "./components/Contact";

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
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
        <Route path="/sarees/silk" element={<SilkSarees />} />
        <Route path="/sarees/cotton" element={<CottonSarees />} />
        <Route path="/sarees/banarasi" element={<BanarasiSarees />} />
        <Route path="/collection" element={<FeaturedCollections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      {/* Footer should not be displayed on CollectionDetails */}
      {location.pathname.startsWith("/collection/") ? null : <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
