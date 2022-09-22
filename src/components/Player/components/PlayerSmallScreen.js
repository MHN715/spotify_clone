/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useContext, useState, useEffect } from "react";
import {
  cssSongInfoBtn,
  cssIcons,
  cssBtnWrapper,
} from "../style/cssPlayerSmallScreen";
import { ReactComponent as PlayCircle_svg } from "../../../icons/PlayCircle.svg";
import { ReactComponent as PauseCircle_svg } from "../../../icons/PauseCircle.svg";

import { ReactComponent as Heart_svg } from "../../../icons/Heart.svg";
import { ReactComponent as Repeat_svg } from "../../../icons/Repeat.svg";

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
        <Repeat_svg
          onClick={() => {
            repeatSong();
          }}
          css={cssIcons}
        />
        <Heart_svg
          css={cssIcons}
          // onClick={() => skipSong("prev")}
        />
        {(() => {
          return playing ? (
            <PauseCircle_svg
              css={cssIcons}
              onClick={() => playPause("pause")}
            />
          ) : (
            <PlayCircle_svg css={cssIcons} onClick={() => playPause("play")} />
          );
        })()}
      </div>
    </>
  );
}
