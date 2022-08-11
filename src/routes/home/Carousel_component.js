/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function Carousel_component({ tracks }) {
  const [sortedTracks, setSortedTracks] = useState([]);

  useEffect(() => {
    const result = tracks?.reduce((sortedArray, currentObj) => {
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
        spaceBetween={13}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        css={css`
          border: 2px solid black;
          width: 100vw;
          height: 9.2rem;
          padding: 0 0.3rem;
        `}
      >
        {sortedTracks?.map((item) => {
          console.log(item.track);
          const { id, name } = item.track;
          const image = item.track.album.images[1];
          return (
            <SwiperSlide key={id}>
              <div
                css={css`
                  height: 100%;
                  width: 100%;
                  display: grid;
                  grid-template-rows: 1fr 1fr;
                `}
              >
                <img src={image.url} alt={name} width="100%" height="width" />
                <h2
                  css={css`
                    border: 1px solid black;
                    font-size: 0.8rem;
                    color: white;
                  `}
                >
                  {name}
                </h2>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
