import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Offers from "./components/Offers";
import Plan from "./components/Plan";
import Rooms from "./components/Rooms";
import Slider from "./components/Slider";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Offers />
      <Plan />
      <Rooms />
      <Slider />
    </div>
  );
}

export default App;
