/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
export default function PageLoadingScreenOverlay({ isLoading }) {
  const anim = keyframes`
    0%{
      background: black;
    }
    99%{
      background: #00000000;
    }
    100%{
      visibility: hidden;
    }
  `;

  console.log("hello from overlay");

  return (
    <>
      {(() => {
        if (isLoading) {
          return (
            <div
              css={css`
                position: absolute;
                /* height: calc(100vh - var(--navHeight)); */
                height: 100vh;
                width: 100vw;
                z-index: 1000;
                color: green;
                font-size: 5rem;
                background: black;
                /* animation: ${anim} 6s ease; */
              `}
            ></div>
          );
        } else if (!isLoading) {
          return (
            <div
              css={css`
                position: absolute;
                height: calc(100vh - var(--navHeight));
                width: 100vw;
                z-index: 1000;
                color: green;
                font-size: 5rem;
                background: black;
                animation: ${anim} 0.2s;
                animation-fill-mode: forwards;
              `}
            ></div>
          );
        }
      })()}
    </>
  );
}
