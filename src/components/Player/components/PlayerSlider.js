/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useContext, useEffect } from "react";
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";

const timeTest = 10;

export default function PlayerSlider() {
  const { duration, currentDuration, playing } =
    useContext(WhatsPlayingContext);
  // console.log("duration: ", duration / 1000);
  // console.log("currentDuration: ", currentDuration);

  const sliderAnim = keyframes`
from {
    width: ${(currentDuration / duration) * 100}%;
}
to {
    width: 100%;
}
`;

  // console.log((currentDuration / duration) * 100);

  return (
    // Slider wrapper
    <div
      css={css`
        /* border: 1px solid yellow; */
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: 1rem;
      `}
    >
      {/* slider bar */}
      <div
        css={css`
          height: 0.3rem;
          width: 95%;
          border-radius: 100rem;
          /* border: 1px solid black; */
          background: #ffffff14;
          display: flex;
          align-items: center;
        `}
      >
        {/* slider button */}
        {(() => {
          if (duration && currentDuration)
            return (
              <div
                css={
                  playing
                    ? css`
                        height: 100%;
                        background: white;
                        border-radius: 100rem;
                        position: relative;
                        /* width: 10%; */
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding-left: 1rem;
                        animation-name: ${sliderAnim};
                        animation-duration: ${duration / 1000}s;
                        animation-timing-function: linear;
                        /* animation-fill-mode: forwards; */
                      `
                    : css`
                        height: 100%;
                        background: white;
                        border-radius: 100rem;
                        position: relative;
                        /* width: 10%; */
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        padding-left: 1rem;
                        width: ${(currentDuration / duration) * 100}%;
                      `
                }
              >
                <div
                  css={css`
                    width: 0.7rem;
                    height: 0.7rem;
                    border-radius: 100%;
                    background: #bebebe;
                    position: absolute;
                  `}
                ></div>
              </div>
            );
        })()}
      </div>
    </div>
  );
}
