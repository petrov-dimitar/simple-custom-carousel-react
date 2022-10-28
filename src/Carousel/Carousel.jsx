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
    if (currentIndex + increment >= items.length) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prev) => prev + increment);
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
        }}
      >
        <button onClick={() => handleOnChangeIndex(-1)}>Previous</button>

        <div
          style={{
            maxWidth: "500px",
          }}
        >
          {items[currentIndex] && items[currentIndex].type === "video" && (
            <iframe
              width={items[currentIndex]}
              height={items[currentIndex]}
              src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
            ></iframe>
          )}
          {items[currentIndex] && items[currentIndex].type === "image" && (
            <img
              style={{
                maxWidth: "500px",
              }}
              src={items[currentIndex].source}
            />
          )}
        </div>

        <button onClick={() => handleOnChangeIndex(1)}>Next</button>
      </div>
    </>
  );
};

export default Carousel;
