import "./App.css";
import Craftsmanship from "./components/Craftsmanship";
import FeaturedCollections from "./components/FeaturedCollections";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewArrivals from "./components/NewArrivals";
import OurHeritage from "./components/OurHeritage";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <FeaturedCollections />
      <NewArrivals />
      <OurHeritage />
      <Craftsmanship />
    </div>
  );
}

export default App;
