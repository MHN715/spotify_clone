import { css, keyframes } from "@emotion/react";
import "../../../variables.css";

const bounce = keyframes`
  from {
    transform: translate3d(0, 100vh, 0);
  }, to {
    transform: translate3d(0,0,0);
  }

`;

const cssWrapperFull = css`
  background: #031328e1;
  width: 100vw;
  height: calc(100vh - var(--navHeight));
  position: absolute;
  /* top: 70vh; */
  z-index: 1000;
  animation: ${bounce} 0.1s ease;
`;

const cssWrapper = css`
  /* border: 2px solid blue; */
  background: #000000ea;
  /* background: black; */
  height: var(--playerHeight);
  width: 100vw;
  /* position: sticky; */
  position: fixed;
  bottom: 4rem;
  z-index: 600;
  display: grid;
  grid-template-columns: 5fr 4fr;
`;
const cssSongInfoBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff17;
  color: white;
`;
const cssBtnWrapper = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid white; */
  position: relative;
`;
const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
  border: 1px solid black;
`;

export { cssWrapper, cssSongInfoBtn, cssBtnWrapper, cssIcons, cssWrapperFull };
