/** @jsxImportSource @emotion/react */
import { css, keyframes, ClassNames, jsx } from "@emotion/react";
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

  return (
    <>
      <ClassNames>
        {({ css, cx }) => (
          <div
            className={cx(
              css`
                position: absolute;
                height: 100vh;
                width: 100vw;
                z-index: 1000;
                background: black;
              `,
              !isLoading
                ? css`
                    animation: ${anim} 0.2s;
                    animation-fill-mode: forwards;
                  `
                : null
            )}
          />
        )}
      </ClassNames>
    </>
  );
}
