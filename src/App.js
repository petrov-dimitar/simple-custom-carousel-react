/** @format */
import "./App.css";
import Carousel from "./Carousel/Carousel";

// Import mock carousel items
import { carouselItems } from "./MockData/carouselItems";

function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
      }}
    >
      <Carousel
        items={carouselItems}
        onPageChange={(currentIndex) =>
          console.log("page changed", currentIndex)
        }
      />
    </div>
  );
}

export default App;
