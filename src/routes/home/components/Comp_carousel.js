/** @jsxImportSource @emotion/react */
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FreeMode, Lazy } from "swiper";
import ContextCarouselEndReached from "../../../Context/ContextCarouselEndReached";
import {
  cssWrapper,
  cssImg,
  cssHeading2_1,
  cssHeading2_2,
  cssCostumSwiper,
} from "../styles/cssCarousel_component";

export default function Comp_carousel({ tracks, title }) {
  const [sortedTracks, setSortedTracks] = useState([]);
  const {
    carouselEndReached1,
    setCarouselEndReached1,
    carouselEndReached2,
    setCarouselEndReached2,
  } = useContext(ContextCarouselEndReached);

  console.log("carouselEndReached1:", carouselEndReached1);
  // console.log(
  //   "CarouselEndReachedContext:",
  //   CarouselEndReachedContext._currentValue
  // );

  // console.log("set", setCarouselEndReached);

  // useEffect(() => {
  //   // sortedTracks.concat([newArray]);
  //   sortedTracks.push(newObject);
  //   console.log(sortedTracks);
  // }, [sortedTracks]);

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

  console.log(sortedTracks);

  let newObject = {
    track: {
      id: "randomId",
      name: "randomName",
      album: {
        images: [
          {},
          {
            url: "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max",
          },
          {},
        ],
      },
    },
  };

  return (
    <div>
      <h2 css={cssHeading2_1}>{title}</h2>{" "}
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
        css={cssCostumSwiper}
      >
        {sortedTracks?.map((item) => {
          // console.log(item.track);
          const { id, name } = item.track;
          const image = item.track.album.images[1];
          return (
            <SwiperSlide key={id}>
              <div css={cssWrapper}>
                <img
                  src={image.url}
                  alt={name}
                  width="100%"
                  height="width"
                  css={cssImg}
                  onClick={() => {
                    console.log("clicked");
                  }}
                />
                <h2 css={cssHeading2_2}>{name}</h2>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
