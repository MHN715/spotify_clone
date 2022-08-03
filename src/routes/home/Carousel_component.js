/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function Carousel_component({ tracks }) {
  // console.log(tracks);
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
          console.log(item.track);
          const { id } = item.track;
          return <SwiperSlide>lol</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
