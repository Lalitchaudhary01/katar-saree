import "./App.css";
import FeaturedCollections from "./components/FeaturedCollections";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewArrivals from "./components/NewArrivals";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <FeaturedCollections />
      <NewArrivals />
    </div>
  );
}

export default App;
