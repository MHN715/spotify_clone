/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext } from "react";
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
import { cssWrapper, cssP, cssBtnWrapper, cssIcons } from "./style/cssPlayer";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";

export default function Player({ spotifyApi, accessToken }) {
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
    <div css={cssWrapper}>
      <p css={cssP}>{currentlyPlayingName}</p>
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
  );
}
