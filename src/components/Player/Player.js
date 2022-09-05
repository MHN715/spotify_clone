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
import SpotifyPlayer from "react-spotify-web-playback";
import { cssWrapper, cssP, cssBtnWrapper, cssIcons } from "./style/cssPlayer";
import { StylesOptions } from "../../components/Player/spotifyReactWebPlaybackInterface";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";

export default function Player({ spotifyApi, accessToken }) {
  const [playing, setPlaying] = useState(false);
  const [currentlyPlayingName, setCurrentlyPlayingName] = useState("");
  const {
    chosenTrack,
    setChosenTrack,
    chosenPlaylist,
    setChosenPlaylist,
    chosenIndex,
    setChosenIndex,
  } = useContext(WhatsPlayingContext);

  useEffect(() => {
    spotifyApi.getMyCurrentPlaybackState().then(
      function (data) {
        console.log(data.body.item.name);
        // Output items
        if (data.body && data.body.is_playing) {
          // setPlaying(true);
        } else {
          // setPlaying(false);
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

  useEffect(() => {
    spotifyApi.getMyCurrentPlayingTrack().then(
      function (data) {
        console.log("Now playing:", data.body.item);
        setCurrentlyPlayingName(
          data.body?.item.name + " " + data.body?.item.artists[0].name
        );
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

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
      <div
        css={css`
          bottom: 4rem;
          width: 100vw;
          z-index: 400;
          position: absolute;
          bottom: 6rem;
          /* display: none; */
        `}
      >
        <SpotifyPlayer
          token={accessToken}
          styles={StylesOptions}
          callback={(e) => {
            console.log(e);
            e.isPlaying && setPlaying(true);
            !e.isPlaying && setPlaying(false);
          }}
          uris={[chosenTrack]}
          play={playing}
        />
      </div>
    </div>
  );

  function playPause(arg) {
    // const btnPressedOnOtherDevice = (err) => setPlaying(!playing);
    return arg === "play"
      ? setPlaying(true)
      : arg === "pause"
      ? setPlaying(false)
      : null;
  }

  function skipSong(arg) {
    return arg === "next"
      ? // console.log(chosenPlaylist);
        (setChosenTrack(chosenPlaylist[chosenIndex + 1].track.uri),
        setChosenIndex(chosenIndex + 1))
      : // console.log(chosenTrack);
      // setSongSkip(true);
      // setPlaying(true);

      arg === "prev"
      ? (setChosenTrack(chosenPlaylist[chosenIndex - 1].track.uri),
        setChosenIndex(chosenIndex - 1))
      : // setSongSkip(true)
        // setPlaying(true);

        null;
  }
}
