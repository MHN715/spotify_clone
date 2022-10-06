/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext, useRef } from "react";
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
  // const [playerFullScreen, setplayerFullScreen] = useState(false);

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
    setDuration,
    duration,
    setCurrentDuration,
    currentDuration,
    playerFullScreen,
    setplayerFullScreen,
    repeatSongState,
    setRepeatSongState,
  } = useContext(WhatsPlayingContext);
  const timerId = useRef(null);

  // function playPause(arg) {
  //   if (!currentlyPlayingName) return;
  //   return arg === "play"
  //     ? playerSDK.resume() && setPlaying(true)
  //     : arg === "pause"
  //     ? playerSDK.pause() && setPlaying(false)
  //     : null;
  // }

  function playPause(arg) {
    if (!currentlyPlayingName) return;
    if (arg === "play") {
      playerSDK.resume();
      setPlaying(true);

      if (repeatSongState) {
        repeatSong("track");
      }
      if (!repeatSongState) {
        repeatSong("off");
      }
    }
    if (arg === "pause") {
      playerSDK.pause();
      clearInterval(timerId.current);
      setPlaying(false);
    }
  }

  // console.log("player");
  // console.log(playerSDK);

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

  function repeatingTrack() {
    playerSDK.seek(0).then(() => {
      clearInterval(timerId.current);
      setCurrentDuration(0);
      console.log("repeat track in", (duration - currentDuration) / 1000 + "s");
      playerSDK.resume();
      // repeatSong("track");
    });
  }

  function repeatSong(arg) {
    if (!arg) return;
    playerSDK?.getCurrentState().then((state) => {
      setDuration(state.duration);
      setCurrentDuration(state.position);
      console.log("test");
    });

    if (arg === "track") {
      console.log("repeat track in", (duration - currentDuration) / 1000 + "s");

      timerId.current = setInterval(() => {
        // if (!playing) return;
        repeatingTrack();
      }, duration - currentDuration);
    } else if (arg === "off") {
      clearInterval(timerId.current);
    }
  }

  useEffect(() => {
    console.log("playing: ", playing);
    console.log("currentDuration: ", currentDuration);
    console.log("duration: ", duration);
  }, [playing]);

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
                accessToken={accessToken}
              />
            );
          }
        })()}
      </div>
    </>
  );
}
