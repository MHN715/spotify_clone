import { css, keyframes } from "@emotion/react";

const bounce = keyframes`
from {
  transform: translate3d(0, 100vh, 0);
}, to {
  transform: translate3d(0,0,0);
}
`;

const cssWrapperFull = css`
  width: 100vw;
  height: 100vh;
  top: 0;
  position: absolute;
  /* top: 70vh; */
  z-index: 3000;
  animation: ${bounce} 0.1s ease;
  display: grid;
  grid-template-rows: 1fr 10fr 1fr 0.5fr;
  overflow-x: hidden;
  background: linear-gradient(#190730, black);
`;

const cssBtnWrapper = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid white; */
`;

const cssMain = css`
  /* border: 1px solid white; */
  width: 100vw;
  display: grid;
  grid-template-rows: 10fr 2fr 4fr;
`;

const cssIcons = css`
  font-size: 1.6rem;
  /* border: 1px solid black; */
  height: 2rem;
  width: 2rem;
  color: #dbdbdb;
`;

const cssIconHeart = css`
  /* font-size: 1.6rem; */
  /* border: 1px solid black; */
  height: 1.5rem;
  width: 1.5rem;
  color: #dbdbdb;
`;

const cssPlayPauseIcons = css`
  font-size: 4.7rem;
  /* border: 1px solid black; */
  color: #dbdbdb;
`;

const cssSongRepeat = css`
  color: #a12727;
  font-size: 1.6rem;
  height: 2rem;
  width: 2rem;
  stroke: #14b253;
  color: #dbdbdb;
`;

const cssHeader = css`
  display: flex;
  /* border: 4px solid white; */
  width: 100vw;
  /* height: 5rem; */
  display: flex;
  justify-content: space-between;
  align-items: top;
  padding-bottom: 5rem;
  /* padding-top: 0.5rem; */
  /* padding-left: 1rem;
  padding-right: 1rem; */
`;

const cssHeaderIcons = css`
  font-size: 1.4rem;
  /* border: 1px solid black; */
  color: #dbdbdb;
  position: relative;
  top: 0.7rem;
  margin: 0 4vw;
`;

const cssFooter = css`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const cssFooterIcons = css`
  width: 1.7rem;
  height: 1.7rem;
  color: #dbdbdb;
`;

const cssPrevNextIcons = css`
  font-size: 2.6rem;
  /* border: 1px solid black; */
  /* height: 2.5rem;
  width: 2.5rem; */
  color: #dbdbdb;
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
  cssSongRepeat,
  cssPrevNextIcons,
  cssHeaderIcons,
};
