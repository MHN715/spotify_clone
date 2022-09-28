/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useRef, useState } from "react";
import {
  cssIcons,
  cssHeader,
  cssFooter,
  cssBtnWrapper,
  cssPlayPauseIcons,
  cssMain,
  cssIconHeart,
  cssFooterIcons,
  cssSongRepeat,
  cssPrevNextIcons,
  cssHeaderIcons,
} from "../style/cssPlayerFullScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FreeMode, Lazy, Navigation } from "swiper";
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";
import PlayerSlider from "./PlayerSlider";

import { BsChevronDown } from "react-icons/bs";
import { TbDotsVertical } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { TbArrowsShuffle } from "react-icons/tb";
import { TbRepeatOnce } from "react-icons/tb";
import { TbRepeat } from "react-icons/tb";
import { MdPlayCircleFilled } from "react-icons/md";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { BiDevices } from "react-icons/bi";
import { CgPlayList } from "react-icons/cg";

export default function PlayerFullScreen({
  playPause,
  skipSong,
  repeatSong,
  setplayerFullScreen,
  playerFullScreen,
  song,
  accessToken,
}) {
  const {
    chosenPlaylist,
    setChosenIndex,
    chosenIndex,
    setChosenTrack,
    setCurrentlyPlayingName,
    currentlyPlayingName,
    playing,
    playerSDK,
    duration,
    setDuration,
    repeatSongState,
    setRepeatSongState,
    setImageUrl,
  } = useContext(WhatsPlayingContext);
  const swiperRef = useRef();
  // const [repeatSongState, setRepeatSongState] = useState(false);
  // console.log("playerFullScreen, repeatSongstate: ", repeatSongState);
  return (
    <>
      <header css={cssHeader}>
        <BsChevronDown
          css={cssHeaderIcons}
          onClick={(e) => {
            // console.log("clicked smallscreen");
            setplayerFullScreen(!playerFullScreen);
            setImageUrl(chosenPlaylist[chosenIndex]?.track.album.images[1].url);
          }}
        />
        {/* <h1
          css={css`
            display: flex;
            font-size: 1rem;
            color: #dbdbdb; ;
          `}
        >
          name
        </h1> */}
        <TbDotsVertical css={cssHeaderIcons} />
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
            // console.log("slide change", e);
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
            width: 100vw;
            position: relative;
            bottom: 2.5rem;
          `}
        >
          {chosenPlaylist?.map((item, index) => {
            const imgUrl = item.track.album.images[1]?.url;
            const { id } = item;
            // console.log(item.track.name);
            // console.log(item.track.album.images[1].url);
            // console.log(chosenPlaylist[index].track.album.images[1].url);

            return (
              <SwiperSlide key={id} data-url={item.track.uri}>
                <div
                  key={id}
                  css={css`
                    /* border: 2px solid green; */
                    display: grid;
                    /* justify-content: center; */
                    height: 100%;
                  `}
                >
                  <img
                    key={id}
                    src={imgUrl}
                    alt=""
                    css={css`
                      /* border: 2px solid blue; */
                      margin-top: 1.3rem;
                      justify-self: center;
                      width: 90vw;
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
            position: relative;
            top: rem;
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
              color: #dbdbdb;
            `}
          >
            {currentlyPlayingName}
          </h2>
          <FiHeart css={cssIconHeart} />
        </div>
        <div
          css={css`
            display: grid;
          `}
        >
          <PlayerSlider />
          <div css={cssBtnWrapper}>
            <TbArrowsShuffle css={cssIcons} />
            <MdSkipPrevious
              css={cssPrevNextIcons}
              onClick={() => {
                skipSong("prev");
                swiperRef.current.slidePrev();
              }}
              // height="1.5rem"
              // width="1.5rem"
            />
            {(() => {
              return playing ? (
                <MdOutlinePauseCircleFilled
                  css={cssPlayPauseIcons}
                  onClick={() => {
                    playPause("pause");
                    // if (repeatSongState) {
                    //   repeatSong("track");
                    // } else if (!repeatSongState) {
                    //   repeatSong("off");
                    // }
                  }}
                  // width="3.3rem"
                  // height="3.3rem"
                />
              ) : (
                <MdPlayCircleFilled
                  css={cssPlayPauseIcons}
                  onClick={() => {
                    playPause("play");
                    // if (repeatSongState) {
                    //   repeatSong("track");
                    // } else if (!repeatSongState) {
                    //   repeatSong("off");
                    // }
                  }}
                  // width="3.3rem"
                  // height="3.3rem"
                />
              );
            })()}
            <MdSkipNext
              css={cssPrevNextIcons}
              onClick={() => {
                skipSong("next");
                // playerSDK.nextTrack().then(() => {
                //   console.log("Skipped to next track!");
                // });
                swiperRef.current.slideNext();
              }}
              // height="1.5rem"
              // width="1.5rem"
            />
            {(() => {
              if (!repeatSongState) {
                return (
                  <TbRepeat
                    css={cssIcons}
                    onClick={() => {
                      repeatSong("track");
                      setRepeatSongState(true);
                    }}
                  />
                );
              } else {
                return (
                  <TbRepeatOnce
                    css={cssIcons}
                    onClick={() => {
                      repeatSong("off");
                      setRepeatSongState(false);
                    }}
                  />
                );
              }
            })()}
          </div>
        </div>
      </main>
      <footer css={cssFooter}>
        <BiDevices css={cssFooterIcons} />
        <CgPlayList css={cssFooterIcons} />
      </footer>
    </>
  );
}
