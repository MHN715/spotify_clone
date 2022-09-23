/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useContext, useState, useEffect } from "react";
import {
  cssSongInfoBtn,
  cssIcons,
  cssBtnWrapper,
} from "../style/cssPlayerSmallScreen";
import { ReactComponent as PlayCircleSvg } from "../../../icons/PlayCircle.svg";
import { ReactComponent as PauseCircleSvg } from "../../../icons/PauseCircle.svg";

import { ReactComponent as HeartSvg } from "../../../icons/Heart.svg";
import { ReactComponent as RepeatSvg } from "../../../icons/Repeat.svg";

export default function PlayerSmallScreen({
  setplayerFullScreen,
  playerFullScreen,
  currentlyPlayingName,
  playing,
  setPlaying,
  skipSong,
  playPause,
  repeatSong,
  chosenPlaylist,
  chosenIndex,
}) {
  const [resetPlaying, setResetPlaying] = useState(false);

  console.log(chosenPlaylist[chosenIndex]?.track.id);

  return (
    <>
      <button
        css={cssSongInfoBtn}
        onClick={(e) => {
          console.log(e);
          console.log("clicked fullscreen");
          setplayerFullScreen(!playerFullScreen);
        }}
      >
        <p>{currentlyPlayingName}</p>
      </button>
      <div css={cssBtnWrapper}>
        <RepeatSvg
          onClick={() => {
            repeatSong();
          }}
          css={cssIcons}
        />
        <HeartSvg
          css={cssIcons}
          // onClick={() => skipSong("prev")}
        />
        {(() => {
          return playing ? (
            <PauseCircleSvg css={cssIcons} onClick={() => playPause("pause")} />
          ) : (
            <PlayCircleSvg css={cssIcons} onClick={() => playPause("play")} />
          );
        })()}
      </div>
    </>
  );
}
