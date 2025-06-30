import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

// Import all components
import Craftsmanship from "./components/Craftsmanship";
import FeaturedCollections from "./components/FeaturedCollections";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar, { WhatsAppButton } from "./components/Navbar";
import NewArrivals from "./components/NewArrivals";
import OurHeritage from "./components/OurHeritage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CollectionDetails from "./components/CollectionDetails";
import BanarasiSarees from "./pages/BanarasiSarees";
import About from "./components/About";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import ReturnPolicy from "./components/policies/ReturnPolicy";
import ShippingPolicy from "./components/policies/ShippingPolicy";
import TermsConditions from "./components/policies/TermsConditions";
import Wishlist from "./headers/Wishlist";
import AuthPage from "./headers/AuthPage";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import BlogPostDetails from "./components/BlogPostDetails";
import VideoCallSection from "./components/VideoCallSection";
import SearchPage from "./components/SearchPage";
import Menu from "./pages/Menu";
import ProtectedRoute from "./components/ProtectedRoute";

// Context Providers
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CurrencyProvider } from "./context/currencyContext";
import { AuthProvider } from "./context/authContext";
import Layout from "./context/Layout";
import UserProfile from "./headers/UserProfile";
import KoraKadhwaStrips from "./pages/KoraKadhwaStrips";
import Moonga from "./pages/Moonga";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const transition = { duration: 0.4, ease: "easeInOut" };

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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
                <FeaturedCollections />
                <NewArrivals />
                <VideoCallSection />
                <Testimonials />
                <Blog />
                <WhatsAppButton />
              </PageWrapper>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Cart />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Wishlist />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <Checkout />
                </PageWrapper>
              </ProtectedRoute>
            }
          />

          {/* Main Routes */}
          <Route
            path="/blog"
            element={
              <PageWrapper>
                <Blog />
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

          {/* Saree Routes */}
          <Route
            path="/featured/silk"
            element={
              <PageWrapper>
                <BanarasiSarees />
              </PageWrapper>
            }
          />

          {/* Collection Routes */}
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

          {/* Information Routes */}
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

          {/* Policy Routes */}
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

          {/* User Routes */}
          <Route
            path="/login"
            element={
              <PageWrapper>
                <AuthPage />
              </PageWrapper>
            }
          />

          {/* Search and Blog Routes */}
          <Route
            path="/search"
            element={
              <PageWrapper>
                <SearchPage />
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
          <Route
            path="/profile"
            element={
              <PageWrapper>
                <UserProfile />
              </PageWrapper>
            }
          />

          {/* Dynamic Menu Routes */}
          <Route path="/trending/:routeCategory" element={<Menu />} />
          <Route path="/featured/:routeCategory" element={<Menu />} />
          <Route path="/collections/:routeCategory" element={<Menu />} />
          <Route path="/clothing/:routeCategory" element={<Menu />} />
          <Route path="/weaves/:routeCategory" element={<Menu />} />
          <Route path="/techniques/:routeCategory" element={<Menu />} />
          <Route path="/fabrics/:routeCategory" element={<Menu />} />
          <Route
            path="/weaves/kora-kadhwa-strips"
            element={<KoraKadhwaStrips />}
          />
          <Route path="/clothing/moonga" element={<Moonga />} />

          {/* Fallback Route */}
        </Routes>
      </AnimatePresence>

      {/* Conditional Footer Rendering */}
      {!location.pathname.startsWith("/collection/") && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CurrencyProvider>
                <Layout>
                  <AppContent />
                </Layout>
              </CurrencyProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Provider>
    </Router>
  );
}

export default App;

// src/App.jsx

// import React from "react";
// import PaymentPending from "./reusable/PaymentPending";

// function App() {
//   return (
//     <div className="App">
//       <PaymentPending />
//     </div>
//   );
// }

// export default App; // 🛑 Yeh line must hai!
