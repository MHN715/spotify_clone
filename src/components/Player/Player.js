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
} from "./style/cssPlayer";
import { cssWrapperFull } from "./style/cssFullScreen";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";
import PlayerSmallScreen from "./components/PlayerSmallScreen";
import PlayerFullScreen from "./components/PlayerFullScreen";
// import { playPause, skipSong } from "./functions";

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
        <PlayerSmallScreen
          setplayerFullScreen={setplayerFullScreen}
          playerFullScreen={playerFullScreen}
          currentlyPlayingName={currentlyPlayingName}
          playing={playing}
          skipSong={skipSong}
          playPause={playPause}
        />
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
        <PlayerFullScreen
          setplayerFullScreen={setplayerFullScreen}
          playerFullScreen={playerFullScreen}
          currentlyPlayingName={currentlyPlayingName}
          playing={playing}
          skipSong={skipSong}
          playPause={playPause}
          chosenPlaylist={chosenPlaylist}
        />
      </div>
    </>
  );
}
