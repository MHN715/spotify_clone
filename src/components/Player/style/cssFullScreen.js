import { css, keyframes } from "@emotion/react";

const bounce = keyframes`
from {
  transform: translate3d(0, 100vh, 0);
}, to {
  transform: translate3d(0,0,0);
}
`;

const cssWrapperFull = css`
  background: #ffffff;
  width: 100vw;
  height: 100vh;
  top: 0;
  position: absolute;
  /* top: 70vh; */
  z-index: 1000;
  animation: ${bounce} 0.1s ease;
  display: grid;
  grid-template-rows: 1.5fr 10fr 1fr;
  overflow-x: hidden;
`;

const cssBtnWrapper = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 5px solid black;
  /* height: 10rem; */
`;

const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
  border: 1px solid black;
`;

const cssHeader = css`
  display: flex;
  border: 4px solid black;
  width: 100vw;
  /* height: 5rem; */
`;

const cssFooter = css`
  border: 1px solid black;
`;

export { cssBtnWrapper, cssIcons, cssHeader, cssWrapperFull, cssFooter };
