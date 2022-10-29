/** @format */

import { useEffect, useRef, useState } from "react";

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
  const ref = useRef(null);

  console.log(ref);

  // Animations
  useEffect(() => {
    const duration = 400;
    const node = ref.current;

    let startTime = performance.now();
    let frameId = null;

    function onFrame(now) {
      const timePassed = now - startTime;
      const progress = Math.min(timePassed / duration, 1);
      onProgress(progress);
      if (progress < 1) {
        // We still have more frames to paint
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress) {
      node.style.opacity = progress;
    }

    function start() {
      onProgress(0);
      startTime = performance.now();
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId);
      startTime = null;
      frameId = null;
    }

    start();
    return () => stop();
  }, [item]);

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      {item && item.type === "video" && (
        <iframe
          ref={ref}
          style={{
            width: "inherit",
            height: "inherit",
          }}
          preload="none"
          src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
        ></iframe>
      )}
      {item && item.type === "image" && (
        <img
          ref={ref}
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
        if (!infiniteLoop) {
          return items.length - 1;
        }
        return 0;
      } else if (index <= 0) {
        if (!infiniteLoop) {
          return 0;
        }
        return items.length - 1;
      }
    }
  };

  useEffect(() => {
    // If autoplay enabled change page on interval
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => findNextIndex(prev + 1));
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, []);

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

        {((!infiniteLoop && !(currentIndex - 1 < 0)) || infiniteLoop) && (
          <CarouselItem
            item={items[findNextIndex(currentIndex - 1)]}
            height="100px"
            width="100px"
          />
        )}
        <CarouselItem item={items[findNextIndex(currentIndex)]} />

        {((!infiniteLoop && !(currentIndex + 1 >= items.length)) ||
          infiniteLoop) && (
          <CarouselItem
            item={items[findNextIndex(currentIndex + 1)]}
            height="100px"
            width="100px"
          />
        )}

        <button onClick={() => handleOnChangeIndex(1)}>Next</button>
      </div>
    </>
  );
};

export default Carousel;
