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

export default function Player({ spotifyApi, accessToken }) {
  const [playing, setPlaying] = useState(false);
  const [devices, setDevices] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");

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

  // console.log("devices:", devices);
  useEffect(() => {
    spotifyApi.getMyDevices().then(
      function (data) {
        let availableDevices = data.body.devices;
        // console.log("availableDevices:", availableDevices);
        setDevices(availableDevices);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi, accessToken]);

  useEffect(() => {
    spotifyApi.getMyCurrentPlaybackState().then(
      function (data) {
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
  }, [spotifyApi, playing, accessToken]);

  useEffect(() => {
    spotifyApi.getMyCurrentPlayingTrack().then(
      function (data) {
        // console.log("Now playing:", data.body.item);
        setCurrentlyPlaying(
          data.body?.item.name + " " + data.body?.item.artists[0].name
        );
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi, accessToken, playing]);

  return (
    <div css={cssWrapper}>
      <p css={cssP}>{currentlyPlaying}</p>
      <div css={cssBtnWrapper}>
        <div
          css={css`
            position: relative;
            border: 1px solid pink;
          `}
        >
          <div
            css={css`
              border: 1px solid yellow;
              position: absolute;
              bottom: 5rem;
              height: 11rem;
              width: 10rem;
              right: -3.1rem;
            `}
          >
            {devices?.map((item) => {
              const { id, name } = item;
              // console.log(item);
              return (
                <button
                  key={id}
                  css={css`
                    color: black;
                  `}
                >
                  {name}{" "}
                </button>
              );
            })}
          </div>
          <FontAwesomeIcon icon={faDisplay} css={cssIcons} />
        </div>
        <FontAwesomeIcon icon={faHeart} css={cssIcons} />
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
      </div>
    </div>
  );
}
