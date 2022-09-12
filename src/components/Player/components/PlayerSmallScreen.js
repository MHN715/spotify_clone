/** @jsxImportSource @emotion/react */
import { cssSongInfoBtn, cssIcons, cssBtnWrapper } from "../style/cssPlayer";
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

export default function PlayerSmallScreen({
  setplayerFullScreen,
  playerFullScreen,
  currentlyPlayingName,
  playing,
  skipSong,
  playPause,
}) {
  return (
    <>
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
    </>
  );
}
