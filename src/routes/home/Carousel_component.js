/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function Carousel_component({ tracks }) {
  const [sortedTracks, setSortedTracks] = useState([]);
  // console.log("unsorted", tracks);

  useEffect(() => {
    if (tracks.length < 1) return;

    const result = tracks.reduce((sortedArray, currentObj) => {
      let dublicateObj = sortedArray.find(
        (item) => item.track.id === currentObj.track.id
      );
      if (dublicateObj) return sortedArray;

      return sortedArray.concat([currentObj]);
    }, []);

    setSortedTracks(result);
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
        {sortedTracks.map((item) => {
          // console.log(item.track);
          const { id } = item.track;
          return <SwiperSlide key={id}>lol</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
