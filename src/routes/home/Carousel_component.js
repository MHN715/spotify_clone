/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function Carousel_component({ tracks }) {
  // console.log(tracks);
  const array = [
    { id: 1, val: "hello 1a" },
    { id: 1, val: "hello 1b" },
    { id: 2, val: "hello 2a" },
    { id: 2, val: "hello 2b" },
  ];
  // console.log("unsorted", array);

  useEffect(() => {
    const lol = tracks.filter((currentValue, index, arr) => {
      // console.log(currentValue, index, arr);
      // return currentValue.track.id !== "4mREn78o8CC6NUgOWnu34C";
      // console.log(currentValue.track.id, arr[index].track.id);
      // console.log(arr[index]);

      // return currentValue.track.id === arr[index].track.id;
      return arr.indexOf(currentValue.track.id) !== arr[index].track.id;
    });
    lol.map((item) => {
      console.log(item.track.id);
    });
  }, [tracks]);

  return (
    <div>
      {" "}
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        css={css`
          border: 2px solid black;
          width: 100vw;
          height: 10rem;
        `}
      >
        {tracks.map((item) => {
          // console.log(item.track);
          const { id } = item.track;
          return <SwiperSlide>lol</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
