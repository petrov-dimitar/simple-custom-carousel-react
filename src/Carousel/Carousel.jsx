/** @format */

import { useState } from "react";

// The assignment purpose is to implement a simple Carousel in React with following features:

// Support Autoplay
// Infinite Loop of Items
// Support Image and video as Item

// The component should expose the following props as configuration options:
// initialIndex?: number, defaults to 0
// transitionDuration?: number, defaults to 400ms
// autoplay?: boolean, defaults to true
// autoplayInterval?: number, defaults to 3000ms
// infiniteLoop?: boolean, defaults to true
// onPageChange?(index: number): void;

const CarouselItem = ({ item, height = "250px", width = "500px" }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      {item && item.type === "video" && (
        <iframe
          style={{
            width: "inherit",
            height: "inherit",
          }}
          src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
        ></iframe>
      )}
      {item && item.type === "image" && (
        <img
          style={{
            width: "inherit",
            height: "inherit",
          }}
          src={item.source}
        />
      )}
    </div>
  );
};

const Carousel = ({
  initialIndex = 0,
  transitionDuration = 400,
  autoplay = true,
  autoplayInterval = 3000,
  infiniteLoop = true,
  onPageChange,
  items = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleOnChangeIndex = (increment) => {
    setCurrentIndex(findNextIndex(currentIndex + increment));
  };

  const findNextIndex = (index) => {
    if (typeof items[index] !== "undefined") {
      return index;
    } else {
      if (index >= items.length) {
        return 0;
      } else if (index <= items.length) {
        return items.length - 1;
      }
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center ",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <button onClick={() => handleOnChangeIndex(-1)}>Previous</button>

        <CarouselItem
          item={items[findNextIndex(currentIndex - 1)]}
          height="100px"
          width="100px"
        />
        <CarouselItem item={items[findNextIndex(currentIndex)]} />
        <CarouselItem
          item={items[findNextIndex(currentIndex + 1)]}
          height="100px"
          width="100px"
        />

        <button onClick={() => handleOnChangeIndex(1)}>Next</button>
      </div>
    </>
  );
};

export default Carousel;
