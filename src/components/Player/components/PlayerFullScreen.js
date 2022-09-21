/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { css } from "@emotion/react";
import {
  cssIcons,
  cssHeader,
  cssFooter,
  cssBtnWrapper,
} from "../style/cssFullScreen";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import "swiper/css/navigation";
import { FreeMode, Lazy, Navigation } from "swiper";
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
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";
import { ReactComponent as PlayCircle_svg } from "../../../icons/PlayCircle.svg";

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
  const swiper = useSwiper();

  console.log("chosenPlaylist", chosenPlaylist);
  console.log("chosenIndex", chosenIndex);
  console.log(useSwiper);
  console.log(playCircle_svg);

  return (
    <>
      <header css={cssHeader}>
        <button
          onClick={(e) => {
            console.log("clicked smallscreen");
            setplayerFullScreen(!playerFullScreen);
          }}
        >
          test
        </button>
        <h1>name</h1>
      </header>
      <main
        css={css`
          border: 2px solid black;
          width: 100vw;
          display: grid;
          grid-template-rows: 10fr 3fr 3fr;
        `}
      >
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
          modules={[Navigation]}
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
          onSwiper={(swiper) => console.log("onSwiper:", swiper)}
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
        <h2
          css={css`
            border: 1px solid pink;
            font-size: 1.4rem;
            text-align: center;
          `}
        >
          {currentlyPlayingName}
        </h2>
        <div css={cssBtnWrapper}>
          <FontAwesomeIcon icon={faHeart} css={cssIcons} />
          <FontAwesomeIcon
            icon={faArrowAltCircleLeft}
            css={cssIcons}
            onClick={() => {
              skipSong("prev");
              swiper.slidePrev();
            }}
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
            onClick={() => {
              skipSong("next");
              swiper.slideNext();
            }}
          />
          {/* <PlayCircle_svg /> */}
          <FontAwesomeIcon icon={faHeart} css={cssIcons} />
        </div>
      </main>
      <footer css={cssFooter}>footer</footer>
    </>
  );
}
