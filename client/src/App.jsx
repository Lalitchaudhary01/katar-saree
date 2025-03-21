import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Craftsmanship from "./components/Craftsmanship";
import FeaturedCollections from "./components/FeaturedCollections";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar, { WhatsAppButton } from "./components/Navbar";
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
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import ReturnPolicy from "./components/policies/ReturnPolicy";
import ShippingPolicy from "./components/policies/ShippingPolicy";
import TermsConditions from "./components/policies/TermsConditions";
import TrendingSection from "./components/TrendingSection";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./headers/Wishlist";
import AuthPage from "./headers/AuthPage";
import Testimonials from "./components/Testimonials";
import ServiceHighlights from "./components/ServiceHighlights";
import { CurrencyProvider } from "./context/currencyContext";
import Blog from "./components/Blog";
import BlogPostDetails from "./components/BlogPostDetails";
import VideoCallSection from "./components/VideoCallSection";
import Packaging from "./components/Packaging";

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const transition = { duration: 0.4, ease: "easeInOut" };

// Wrapper component for animations
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
                <VideoCallSection />
                <FeaturedCollections />
                <ServiceHighlights />
                <NewArrivals />
                {/* <Testimonials /> */}
                <Blog />
                {/* <Packaging /> */}
                <WhatsAppButton />
              </PageWrapper>
            }
          />
          <Route
            path="/cart"
            element={
              <PageWrapper>
                <Cart />
              </PageWrapper>
            }
          />
          <Route
            path="/blog"
            element={
              <PageWrapper>
                <Blog />
              </PageWrapper>
            }
          />
          <Route
            path="/checkout"
            element={
              <PageWrapper>
                <Checkout />
              </PageWrapper>
            }
          />
          <Route
            path="/collection/:id"
            element={
              <PageWrapper>
                <CollectionDetails />
              </PageWrapper>
            }
          />
          <Route
            path="/sarees/silk"
            element={
              <PageWrapper>
                <SilkSarees />
              </PageWrapper>
            }
          />
          <Route
            path="/sarees/cotton"
            element={
              <PageWrapper>
                <CottonSarees />
              </PageWrapper>
            }
          />
          <Route
            path="/sarees/banarasi"
            element={
              <PageWrapper>
                <BanarasiSarees />
              </PageWrapper>
            }
          />
          <Route
            path="/collection"
            element={
              <PageWrapper>
                <FeaturedCollections />
              </PageWrapper>
            }
          />
          <Route
            path="/new-arrivals"
            element={
              <PageWrapper>
                <NewArrivals />
              </PageWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PageWrapper>
                <PrivacyPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/return-policy"
            element={
              <PageWrapper>
                <ReturnPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/shipping-policy"
            element={
              <PageWrapper>
                <ShippingPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/terms-conditions"
            element={
              <PageWrapper>
                <TermsConditions />
              </PageWrapper>
            }
          />
          <Route
            path="/about/heritage"
            element={
              <PageWrapper>
                <OurHeritage />
              </PageWrapper>
            }
          />
          <Route
            path="/about/craft"
            element={
              <PageWrapper>
                <Craftsmanship />
              </PageWrapper>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PageWrapper>
                <Wishlist />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <AuthPage />
              </PageWrapper>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <PageWrapper>
                <BlogPostDetails />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>

      {location.pathname.startsWith("/collection/") ? null : <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <CurrencyProvider>
          <Router>
            <AppContent />
          </Router>
        </CurrencyProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
