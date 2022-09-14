/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { cssIcons, cssHeader } from "../style/cssFullScreen";
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
import { cssBtnWrapper } from "../style/cssPlayerSmallScreen";

export default function PlayerFullScreen({
  setplayerFullScreen,
  playerFullScreen,
  chosenPlaylist,
  playPause,
  skipSong,
  playing,
}) {
  console.log(chosenPlaylist);
  return (
    <>
      <header css={cssHeader}>
        <button
          onClick={(e) => {
            console.log(e);
            console.log("clicked");
            setplayerFullScreen(!playerFullScreen);
          }}
        >
          test
        </button>
        <h1>name</h1>
      </header>
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
        <div css={cssBtnWrapper}>
          <FontAwesomeIcon icon={faHeart} css={cssIcons} />
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
          <FontAwesomeIcon icon={faHeart} css={cssIcons} />
        </div>
      </main>
      <footer
        css={css`
          border: 1px solid black;
        `}
      >
        footer
      </footer>
    </>
  );
}
