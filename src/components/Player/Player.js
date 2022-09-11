/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faPauseCircle,
  faHeart,
  faDisplay,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  cssWrapper,
  cssSongInfoBtn,
  cssBtnWrapper,
  cssIcons,
  cssWrapperFull,
} from "./style/cssPlayer";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";

export default function Player({ spotifyApi, accessToken }) {
  const [playerFullScreen, setplayerFullScreen] = useState(false);
  const {
    chosenTrack,
    setChosenTrack,
    chosenPlaylist,
    setChosenPlaylist,
    chosenIndex,
    setChosenIndex,
    playing,
    setPlaying,
    currentlyPlayingName,
    setCurrentlyPlayingName,
  } = useContext(WhatsPlayingContext);

  function playPause(arg) {
    if (!currentlyPlayingName) return;
    return arg === "play"
      ? setPlaying(true)
      : arg === "pause"
      ? setPlaying(false)
      : null;
  }

  function skipSong(arg) {
    return arg === "next"
      ? (setChosenTrack(chosenPlaylist[chosenIndex + 1].track.uri),
        setChosenIndex(chosenIndex + 1),
        setCurrentlyPlayingName(
          chosenPlaylist[chosenIndex + 1].track.name +
            " - " +
            chosenPlaylist[chosenIndex + 1].track.artists[0].name
        ))
      : arg === "prev"
      ? (setChosenTrack(chosenPlaylist[chosenIndex - 1].track.uri),
        setChosenIndex(chosenIndex - 1),
        setCurrentlyPlayingName(
          chosenPlaylist[chosenIndex - 1].track.name +
            " - " +
            chosenPlaylist[chosenIndex - 1].track.artists[0].name
        ))
      : null;
  }

  return (
    <>
      <div
        css={
          !playerFullScreen && currentlyPlayingName
            ? cssWrapper
            : css`
                display: none;
              `
        }
      >
        <button
          css={cssSongInfoBtn}
          onClick={(e) => {
            console.log(e);
            console.log("clicked");
            setplayerFullScreen(!playerFullScreen);
          }}
        >
          <p>{currentlyPlayingName}</p>
        </button>
        <div css={cssBtnWrapper}>
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            css={cssIcons}
            onClick={() => skipSong("prev")}
          />
          {(() => {
            return playing ? (
              <FontAwesomeIcon
                icon={faPauseCircle}
                css={cssIcons}
                onClick={() => playPause("pause")}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPlayCircle}
                css={cssIcons}
                onClick={() => playPause("play")}
              />
            );
          })()}
          <FontAwesomeIcon
            icon={faArrowAltCircleRight}
            css={cssIcons}
            onClick={() => skipSong("next")}
          />
        </div>
      </div>
      <div
        css={
          playerFullScreen && currentlyPlayingName
            ? cssWrapperFull
            : css`
                display: none;
              `
        }
      >
        <button
          css={cssSongInfoBtn}
          onClick={(e) => {
            console.log(e);
            console.log("clicked");
            setplayerFullScreen(!playerFullScreen);
          }}
        >
          test
        </button>
        <main>
          <Swiper
            spaceBetween={13}
            slidesPerView={3}
            // freeMode={true}
            // lazy={true}
            // loadOnTransitionStart={true}
            // checkInView={true}
            // loadPrevNext={true}
            // loadPrevNextAmount={3}
            // modules={[Lazy, FreeMode]}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log("onSwiper:", swiper)}
            onReachEnd={(e) =>
              e.progress > 0 && e.isEnd === true
                ? console.log("carousel end reached")
                : null
            }
          ></Swiper>
        </main>
      </div>
    </>
  );
}
