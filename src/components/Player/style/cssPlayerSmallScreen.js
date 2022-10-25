import { css, keyframes } from "@emotion/react";
import "../../../variables.css";

const cssWrapper = css`
  /* border: 2px solid blue; */
  background: rgba(1, 4, 15, 0.954);
  background: #02385ce8;
  /* background: black; */
  height: var(--playerHeight);
  width: 96vw;
  left: 2vw;
  /* position: sticky; */
  position: fixed;
  bottom: var(--navHeight);
  z-index: 600;
  display: grid;
  grid-template-columns: 2.5fr 7fr 5fr;
  border-radius: 0.7rem;
  margin-bottom: -0.043rem;
`;

const cssSongInfoBtn = css`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  background: none;
  color: white;
  border: none;
`;
const cssBtnWrapper = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid white; */
  position: relative;
  /* border: 1px solid white; */
  /* width: 7rem; */
`;

const cssIcons = css`
  color: #dbdbdb;
  /* border: 1px solid white; */
  font-size: 1.5rem;
`;

const cssIconsPlayPause = css`
  color: #dbdbdb;
  /* border: 1px solid white; */
  font-size: 2rem;
`;

export {
  cssWrapper,
  cssSongInfoBtn,
  cssBtnWrapper,
  cssIcons,
  cssIconsPlayPause,
};
