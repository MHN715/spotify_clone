/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
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

export default function Player({ spotifyApi }) {
  const [playing, setPlaying] = useState(false);
  const [songSkip, setSongSkip] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");

  console.log("playing:", playing);
  console.log("currentlyPlaying", currentlyPlaying);

  function playPause(arg) {
    const btnPressedOnOtherDevice = (err) => setPlaying(!playing);

    return arg === "play"
      ? spotifyApi.play().then(() => setPlaying(true), btnPressedOnOtherDevice)
      : arg === "pause"
      ? spotifyApi
          .pause()
          .then(() => setPlaying(false), btnPressedOnOtherDevice)
      : null;
  }

  function skipSong(arg) {
    // spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    //   setCurrentlyPlaying(
    //     data.body?.item.name + " " + data.body?.item.artists[0].name
    //   );
    //   console.log(currentlyPlaying);
    // });

    return arg === "next"
      ? spotifyApi.skipToNext().then(() => {
          setSongSkip(true);
          setPlaying(true);
        })
      : arg === "prev"
      ? spotifyApi.skipToPrevious().then(() => {
          setSongSkip(true);
          setPlaying(true);
        })
      : null;
  }

  useEffect(() => {
    console.log("song skipped");
    setTimeout(() => {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("skipsong", data);
        setCurrentlyPlaying(
          data.body?.item.name + " " + data.body?.item.artists[0].name
        );
        console.log(currentlyPlaying);
      });
    }, 100);

    return () => {
      setSongSkip(false);
    };
  }, [spotifyApi, songSkip, playing]);

  useEffect(() => {
    spotifyApi.getMyCurrentPlaybackState().then(
      function (data) {
        console.log(data.body.item.name);
        // Output items
        if (data.body && data.body.is_playing) {
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi, playing]);

  useEffect(() => {
    spotifyApi.getMyCurrentPlayingTrack().then(
      function (data) {
        console.log("Now playing:", data.body.item);
        setCurrentlyPlaying(
          data.body?.item.name + " " + data.body?.item.artists[0].name
        );
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi, playing]);

  return (
    <div css={cssWrapper}>
      <p css={cssP}>{currentlyPlaying}</p>
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
