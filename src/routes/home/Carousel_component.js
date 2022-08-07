/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function Carousel_component({ tracks }) {
  console.log(tracks);
  const array = [
    { id: 1, val: "hello 1a" },
    { id: 1, val: "hello 1b" },
    { id: 2, val: "hello 2a" },
    { id: 2, val: "hello 2b" },
  ];
  console.log("unsorted", array);

  useEffect(() => {
    const filteredArray = array.filter((obj, index, arr) => {
      console.log("obj", obj);
      console.log("index", index);
      console.log("arr", arr);
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === index;
    });

    console.log("sorted", filteredArray);
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
