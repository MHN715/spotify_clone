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
} from "@fortawesome/free-solid-svg-icons";
import PlayPauseButton from "./components/PlayPauseButton";

export default function Player({ spotifyApi }) {
  const [playing, setPlaying] = useState(false);

  function Play() {
    console.log("clicked play");
    spotifyApi.play().then(
      function () {
        setPlaying(true);
        console.log("Playback started");
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
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
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
  }

  useEffect(() => {
    spotifyApi.getMyDevices().then(
      function (data) {
        let availableDevices = data.body.devices;
        console.log("availableDevices:", availableDevices);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [spotifyApi]);

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
        text
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
        <PlayPauseButton />
      </div>
    </div>
  );
}

const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
`;
