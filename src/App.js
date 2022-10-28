/** @format */
import "./App.css";
import Carousel from "./Carousel/Carousel";

function App() {
  const carouselItems = [
    {
      type: "video",
      source:
        "https://www.youtube.com/watch?v=53c8VEARcg8&ab_channel=MarkBell%27sPowerProject",
    },
    {
      type: "image",
      source:
        "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
    },
    {
      type: "image",
      source:
        "https://media.istockphoto.com/photos/image-of-open-antique-book-on-wooden-table-with-glitter-overlay-picture-id1354441996?b=1&k=20&m=1354441996&s=170667a&w=0&h=O4JDagXhIh1N13PNN6G4_L5KB5QPZryin7FOrZnzYvc=",
    },
  ];
  return (
    <div
      className="App"
      style={{
        height: "100vh",
      }}
    >
      <Carousel items={carouselItems} />
    </div>
  );
}

export default App;
