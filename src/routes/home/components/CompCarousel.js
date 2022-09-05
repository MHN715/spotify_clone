/** @jsxImportSource @emotion/react */
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FreeMode, Lazy } from "swiper";
import {
  cssWrapper,
  cssImg,
  cssHeading2_1,
  cssHeading2_2,
  cssCostumSwiper,
} from "../styles/cssCompCarpusel";
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";

export default function CompCarousel({ tracks, title }) {
  const [sortedTracks, setSortedTracks] = useState([]);
  const {
    chosenTrack,
    setChosenTrack,
    chosenPlaylist,
    setChosenPlaylist,
    chosenIndex,
    setChosenIndex,
  } = useContext(WhatsPlayingContext);

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
          e.progress > 0 && e.isEnd === true
            ? console.log("carousel end reached")
            : null
        }
        css={cssCostumSwiper}
      >
        {sortedTracks?.map((item, index) => {
          // console.log(item.track.uri);
          const { id, name, uri } = item.track;
          const image = item.track.album.images[1];
          return (
            <SwiperSlide key={id}>
              <div
                css={cssWrapper}
                onClick={() => {
                  console.log(index, item);
                  console.log(sortedTracks[index]);
                  console.log(sortedTracks);
                  setChosenTrack(uri);
                  setChosenPlaylist(sortedTracks);
                  setChosenIndex(index);
                }}
              >
                <img
                  src={image.url}
                  alt={name}
                  width="100%"
                  height="width"
                  css={cssImg}
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
