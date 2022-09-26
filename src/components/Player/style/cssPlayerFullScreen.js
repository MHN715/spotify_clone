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
  grid-template-rows: 1fr 10fr 1fr;
  overflow-x: hidden;
`;

const cssBtnWrapper = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 5px solid black;
`;

const cssMain = css`
  border: 2px solid black;
  width: 100vw;
  display: grid;
  grid-template-rows: 10fr 2fr 4fr;
`;

const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
  /* border: 1px solid black; */
  height: 2rem;
  width: 2rem;
`;

const cssIconHeart = css`
  color: #a12727;
  /* font-size: 1.6rem; */
  /* border: 1px solid black; */
  height: 1.5rem;
  width: 1.5rem;
`;

const cssPlayPauseIcons = css`
  color: #a12727;
  font-size: 1.6rem;
  /* border: 1px solid black; */
  height: 3.5rem;
  width: 3.5rem;
`;

const cssHeader = css`
  display: flex;
  border: 4px solid black;
  width: 100vw;
  /* height: 5rem; */
  display: flex;
  justify-content: space-between;
  align-items: top;
  padding: 0 0.5rem;
  padding-top: 0.5rem;
`;

const cssFooter = css`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const cssFooterIcons = css`
  width: 1.7rem;
  height: 1.7rem;
`;

export {
  cssBtnWrapper,
  cssIcons,
  cssHeader,
  cssWrapperFull,
  cssFooter,
  cssPlayPauseIcons,
  cssMain,
  cssIconHeart,
  cssFooterIcons,
};
