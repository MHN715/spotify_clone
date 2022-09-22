import { css, keyframes } from "@emotion/react";

const cssSongInfoBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
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
  border: 1px solid white;
  /* width: 7rem; */
`;

const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
  border: 1px solid black;
  width: 1.5rem;
  height: 1.5rem;
`;

export { cssSongInfoBtn, cssBtnWrapper, cssIcons };
