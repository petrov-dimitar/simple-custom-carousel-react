/** @format */
import { useRef } from "react";
import { useFadeIn } from "./hooks/useFadeIn";

const CarouselItem = ({
  item,
  height = "250px",
  width = "500px",
  transitionDuration = 400,
}) => {
  const ref = useRef(null);

  // Add Animations with a hook.
  useFadeIn(ref, transitionDuration, item);

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      {item && item.type === "video" && (
        <iframe
          title={item.source}
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
          alt={item.source}
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

export default CarouselItem;
