import { css } from "@emotion/react";
const cssWrapper = css`
  background: #ffffff7b;
  height: 4.3rem;
  width: 100vw;
  position: sticky;
  position: fixed;
  bottom: 4rem;
  z-index: 600;
  display: grid;
  grid-template-columns: 5fr 4fr;
`;
const cssP = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const cssBtnWrapper = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid white;
  position: relative;
`;
const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
  border: 1px solid black;
`;

export { cssWrapper, cssP, cssBtnWrapper, cssIcons };
