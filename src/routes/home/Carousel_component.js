/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FreeMode, Lazy } from "swiper";
import CarouselEndReachedContext from "../../Context/CarouselEndReachedContext";

export default function Carousel_component({ tracks, title }) {
  const [sortedTracks, setSortedTracks] = useState([]);
  const {
    carouselEndReached1,
    setCarouselEndReached1,
    carouselEndReached2,
    setCarouselEndReached2,
  } = useContext(CarouselEndReachedContext);

  console.log("carouselEndReached1:", carouselEndReached1);
  // console.log(
  //   "CarouselEndReachedContext:",
  //   CarouselEndReachedContext._currentValue
  // );

  // console.log("set", setCarouselEndReached);

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

  function CarouselEndReached() {
    setCarouselEndReached1(true);
    return;
  }

  return (
    <div>
      <h2
        css={css`
          color: white;
        `}
      >
        {title}
      </h2>{" "}
      <Swiper
        spaceBetween={13}
        slidesPerView={3}
        freeMode={true}
        lazy={true}
        modules={[Lazy, FreeMode]}
        onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        onReachEnd={(e) =>
          e.progress > 0 && e.isEnd === true ? CarouselEndReached() : null
        }
        css={css`
          width: 100vw;
          height: 9.2rem;
          padding: 0 0.3rem;
        `}
      >
        {sortedTracks?.map((item) => {
          // console.log(item.track);
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
                <img
                  src={image.url}
                  alt={name}
                  width="100%"
                  height="width"
                  css={css`
                    border-radius: 20px;
                    box-shadow: 1px 3px 7px 3px #00000045;
                  `}
                  onClick={() => {
                    console.log("clicked");
                  }}
                />
                <h2
                  css={css`
                    font-size: 0.9rem;
                    color: white;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-top: 0.2rem;
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
