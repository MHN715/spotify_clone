/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export default function PlayPauseButton() {
  return (
    <button
      css={css`
        border: 1px solid black;
        height: 2rem;
        width: 2rem;
      `}
    >
      <div
        css={css`
          width: 0;
          height: 0;
          border: 15px solid transparent;
          border-top: 0;
          border-bottom: 30px solid red;
          /* background: blue; */
          /* position: relative; */
          /* right: 20rem;
          bottom: 20rem; */
          transform-origin: 180deg;
        `}
      ></div>
    </button>
  );
}
