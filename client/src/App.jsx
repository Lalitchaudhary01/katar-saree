import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewArrivals from "./components/NewArrivals";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <NewArrivals />
    </div>
  );
}

export default App;
