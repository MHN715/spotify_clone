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

export default function Player({ spotifyApi }) {
  const [playing, setPlaying] = useState(false);
  const [devices, setDevices] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("");

  function Play() {
    console.log("clicked play");
    spotifyApi.play().then(
      function () {
        setPlaying(true);
        console.log("Playback started");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }
  function Pause() {
    console.log("clicked pause");
    spotifyApi.pause().then(
      function () {
        setPlaying(false);
        console.log("Playback paused");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }
  console.log(devices);
  useEffect(() => {
    spotifyApi.getMyDevices().then(
      function (data) {
        let availableDevices = data.body.devices;
        console.log("availableDevices:", availableDevices);
        setDevices(availableDevices);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

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
    <div
      css={css`
        background: #ffffff7b;
        height: 4.3rem;
        width: 100vw;
        position: sticky;
        position: fixed;
        bottom: 4rem;
        z-index: 300;
        display: grid;
        grid-template-columns: 3fr 2fr;
      `}
    >
      {" "}
      <p
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {currentlyPlaying}
      </p>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 1rem;
          /* border: 1px solid white; */
        `}
      >
        <FontAwesomeIcon icon={faDisplay} css={cssIcons} />
        <FontAwesomeIcon icon={faHeart} css={cssIcons} />
        {(() => {
          return playing ? (
            <FontAwesomeIcon
              icon={faPauseCircle}
              css={cssIcons}
              onClick={() => Pause()}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlayCircle}
              css={cssIcons}
              onClick={() => Play()}
            />
          );
        })()}
      </div>
    </div>
  );
}

const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
`;
