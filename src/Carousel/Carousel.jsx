/** @format */

import { useCallback, useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";

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

// The carousel shows 3 items in the UI, with the current one being bigger on focus.
// The carousel also has Previous and Next buttons to navigate
// By default the carousel auto-plays and loops infinitely, but that can be overridden.

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
    setCurrentIndex(findFollowingIndex(currentIndex + increment));
  };

  // Provide index based items length and provided index.
  const findFollowingIndex = useCallback(
    (index) => {
      // If wanted index exist in items, return it.
      if (typeof items[index] !== "undefined") {
        return index;
      } else {
        // Otherwise index does not exist in items.
        // If wanted index is bigger than items length.
        if (index >= items.length) {
          // if infinite loop is not, return last item index
          if (!infiniteLoop) {
            return items.length - 1;
          }
          // Otherwise return first index of items to restart the loop.
          return 0;
        }
        // If wanted index is smaller than 0.
        else if (index <= 0) {
          if (!infiniteLoop) {
            return 0;
          }
          // Return last elements to restart the loop.
          return items.length - 1;
        }
      }
    },
    [infiniteLoop, items]
  );

  // Autoplay
  useEffect(() => {
    // If autoplay enabled change page on interval.
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => findFollowingIndex(prev + 1));
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, findFollowingIndex]);

  // Do something on every page change.
  useEffect(() => {
    if (onPageChange) {
      // Allow access to current item
      onPageChange(items[currentIndex]);
    }
  }, [currentIndex, items, onPageChange]);

  // If no items are provided return null.
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
        <button
          style={{
            marginRight: "16px",
          }}
          onClick={() => handleOnChangeIndex(-1)}
        >
          {`<  Previous`}
        </button>

        {((!infiniteLoop && !(currentIndex - 1 < 0)) || infiniteLoop) && (
          <CarouselItem
            item={items[findFollowingIndex(currentIndex - 1)]}
            height="100px"
            width="100px"
            transitionDuration={transitionDuration}
          />
        )}

        {/* Current item */}
        <CarouselItem
          item={items[findFollowingIndex(currentIndex)]}
          transitionDuration={transitionDuration}
        />

        {((!infiniteLoop && !(currentIndex + 1 >= items.length)) ||
          infiniteLoop) && (
          <CarouselItem
            item={items[findFollowingIndex(currentIndex + 1)]}
            height="100px"
            width="100px"
          />
        )}

        <button
          style={{
            marginLeft: "16px",
          }}
          onClick={() => handleOnChangeIndex(1)}
        >
          {`Next  >`}
        </button>
      </div>
    </>
  );
};

export default Carousel;
