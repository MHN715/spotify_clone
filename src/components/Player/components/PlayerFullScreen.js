/** @jsxImportSource @emotion/react */
import { useContext, useRef } from "react";
import { css } from "@emotion/react";
import {
  cssIcons,
  cssHeader,
  cssFooter,
  cssBtnWrapper,
  cssPlayPauseIcons,
  cssMain,
  cssIconHeart,
  cssFooterIcons,
} from "../style/cssFullScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FreeMode, Lazy, Navigation } from "swiper";
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";
import { ReactComponent as PlayCircle_svg } from "../../../icons/PlayCircle.svg";
import { ReactComponent as PauseCircle_svg } from "../../../icons/PauseCircle.svg";

import { ReactComponent as Heart_svg } from "../../../icons/Heart.svg";
import { ReactComponent as Mix_svg } from "../../../icons/Mix.svg";
import { ReactComponent as Next_svg } from "../../../icons/Next.svg";
import { ReactComponent as Prev_svg } from "../../../icons/Prev.svg";
import { ReactComponent as Repeat_svg } from "../../../icons/Repeat.svg";
import { ReactComponent as DownArrow_svg } from "../../../icons/DownArrow.svg";
import { ReactComponent as DotsSettings_svg } from "../../../icons/DotsSettings.svg";
import { ReactComponent as Devices_svg } from "../../../icons/Devices.svg";
import { ReactComponent as List_svg } from "../../../icons/List.svg";

export default function PlayerFullScreen({
  playPause,
  skipSong,
  setplayerFullScreen,
  playerFullScreen,
}) {
  const {
    chosenPlaylist,
    setChosenIndex,
    chosenIndex,
    setChosenTrack,
    setCurrentlyPlayingName,
    currentlyPlayingName,
    playing,
  } = useContext(WhatsPlayingContext);
  const swiperRef = useRef();

  console.log("chosenPlaylist", chosenPlaylist);
  console.log("chosenIndex", chosenIndex);

  return (
    <>
      <header css={cssHeader}>
        <DownArrow_svg
          onClick={(e) => {
            console.log("clicked smallscreen");
            setplayerFullScreen(!playerFullScreen);
          }}
          css={css`
            height: 2rem;
            width: 2rem;
          `}
        ></DownArrow_svg>
        <h1
          css={css`
            /* border: 2px solid black; */
            display: flex;
            font-size: 1rem;
          `}
        >
          name
        </h1>
        <DotsSettings_svg />
      </header>
      <main css={cssMain}>
        <Swiper
          // spaceBetween={13}
          slidesPerView={1}
          initialSlide={chosenIndex ? chosenIndex : 0}
          // freeMode={true}
          // lazy={true}
          // loadOnTransitionStart={true}
          // checkInView={true}
          // loadPrevNext={true}
          // loadPrevNextAmount={3}
          // modules={[Navigation]}
          navigation={true}
          onSlideChange={(e) => {
            console.log("slide change", e);
            setChosenIndex(e.realIndex);
            setChosenTrack(chosenPlaylist[e.realIndex].track.uri);
            setCurrentlyPlayingName(
              chosenPlaylist[e.realIndex].track.name +
                " - " +
                chosenPlaylist[e.realIndex].track.artists[0].name
            );
          }}
          onSwiper={(swiper) => {
            console.log("onSwiper:", swiper);
            swiperRef.current = swiper;
          }}
          onReachEnd={(e) =>
            e.progress > 0 && e.isEnd === true
              ? console.log("carousel end reached")
              : null
          }
          css={css`
            border: 2px solid blue;
            width: 100vw;
          `}
        >
          {chosenPlaylist?.map((item, index) => {
            const imgUrl = item.track.album.images[1].url;
            const { id } = item;
            console.log(item.track.name);
            // console.log(item.track.album.images[1].url);
            // console.log(chosenPlaylist[index].track.album.images[1].url);

            return (
              <SwiperSlide data-url={item.track.uri}>
                <div
                  key={id + index}
                  css={css`
                    border: 2px solid green;
                    display: grid;
                    /* justify-content: center; */
                    height: 100%;
                  `}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    css={css`
                      border: 2px solid blue;
                      margin-top: 1.3rem;
                      justify-self: center;
                    `}
                  />
                </div>{" "}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          css={css`
            display: flex;
            align-items: center;
            padding: 0 1rem;
            justify-content: space-between;
          `}
        >
          <h2
            css={css`
              /* border: 1px solid pink; */
              font-size: 1.4rem;
              text-align: center;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 80vw;
            `}
          >
            {currentlyPlayingName}
          </h2>
          <Heart_svg css={cssIconHeart} />
        </div>
        <div css={cssBtnWrapper}>
          <Mix_svg height="1.5rem" width="1.5rem" />
          <Prev_svg
            css={cssIcons}
            onClick={() => {
              skipSong("prev");
              swiperRef.current.slidePrev();
            }}
            // height="1.5rem"
            // width="1.5rem"
          />
          {(() => {
            return playing ? (
              <PauseCircle_svg
                css={cssPlayPauseIcons}
                onClick={() => playPause("pause")}
                // width="3.3rem"
                // height="3.3rem"
              />
            ) : (
              <PlayCircle_svg
                css={cssPlayPauseIcons}
                onClick={() => playPause("play")}
                width="3.3rem"
                height="3.3rem"
              />
            );
          })()}
          <Next_svg
            css={cssIcons}
            onClick={() => {
              skipSong("next");
              swiperRef.current.slideNext();
            }}
            // height="1.5rem"
            // width="1.5rem"
          />
          <Repeat_svg css={cssIcons} />
        </div>
      </main>
      <footer css={cssFooter}>
        <Devices_svg css={cssFooterIcons} />
        <List_svg css={cssFooterIcons} />
      </footer>
    </>
  );
}
