/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { cssWrapper } from "./style/cssPlayerSmallScreen";
import { cssWrapperFull } from "./style/cssPlayerFullScreen";
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
    playerSDK,
  } = useContext(WhatsPlayingContext);

  function playPause(arg) {
    if (!currentlyPlayingName) return;
    return arg === "play"
      ? playerSDK.resume() && setPlaying(true)
      : arg === "pause"
      ? playerSDK.pause() && setPlaying(false)
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

  function repeatSong() {
    spotifyApi.setRepeat("track").then(
      function () {
        console.log("Repeat track.");
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
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
          setPlaying={setPlaying}
          repeatSong={repeatSong}
          chosenTrack={chosenTrack}
          chosenPlaylist={chosenPlaylist}
          chosenIndex={chosenIndex}
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
        {(() => {
          if (chosenIndex !== null && playerFullScreen) {
            return (
              <PlayerFullScreen
                setplayerFullScreen={setplayerFullScreen}
                playerFullScreen={playerFullScreen}
                skipSong={skipSong}
                playPause={playPause}
                repeatSong={repeatSong}
              />
            );
          }
        })()}
      </div>
    </>
  );
}
