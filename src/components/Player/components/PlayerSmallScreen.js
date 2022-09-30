/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useContext, useState, useEffect } from "react";
import {
  cssSongInfoBtn,
  cssIcons,
  cssBtnWrapper,
  cssIconsPlayPause,
} from "../style/cssPlayerSmallScreen";

import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { BiDevices } from "react-icons/bi";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";

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
  const { imageUrl } = useContext(WhatsPlayingContext);

  // console.log(chosenPlaylist[chosenIndex]?.track.id);

  return (
    <>
      <div
        css={css`
          /* border: 1px solid white; */
          display: flex;
          justify-content: center;
          align-items: center;
        `}
        onClick={(e) => {
          // console.log(e);
          // console.log("clicked fullscreen");
          setplayerFullScreen(!playerFullScreen);
        }}
      >
        <img
          src={imageUrl}
          alt=""
          css={css`
            width: 90%;
            height: 90%;
            border-radius: 1rem;
          `}
        />
      </div>
      <button
        css={cssSongInfoBtn}
        onClick={(e) => {
          // console.log(e);
          // console.log("clicked fullscreen");
          setplayerFullScreen(!playerFullScreen);
        }}
      >
        <p>{currentlyPlayingName}</p>
      </button>
      <div css={cssBtnWrapper}>
        <BiDevices
          css={cssIcons}
          onClick={() => console.log("devices clicked")}
        />
        <FiHeart css={cssIcons} onClick={() => console.log("heart clicked")} />
        {(() => {
          return playing ? (
            <BsPauseFill
              css={cssIconsPlayPause}
              onClick={() => playPause("pause")}
            />
          ) : (
            <BsPlayFill
              css={cssIconsPlayPause}
              onClick={() => playPause("play")}
            />
          );
        })()}
      </div>
    </>
  );
}
