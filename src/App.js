/** @format */
import "./App.css";
import Carousel from "./Carousel/Carousel";

function App() {
  const carouselItems = [
    {
      type: "image",
      source:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
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
    {
      type: "image",
      source:
        "http://az837918.vo.msecnd.net/publishedimages/articles/1733/en-CA/images/1/free-download-this-stunning-alberta-scene-for-your-device-background-image-L-6.jpg",
    },
    {
      type: "image",
      source: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    },
    {
      type: "image",
      source: "https://learnopencv.com/wp-content/uploads/2021/04/image-15.png",
    },
  ];
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
