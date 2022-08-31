import { css } from "@emotion/react";
const cssWrapper = css`
  background: #ffffff7b;
  height: 4.3rem;
  width: 100vw;
  position: sticky;
  position: fixed;
  bottom: 4rem;
  z-index: 300;
  display: grid;
  grid-template-columns: 3fr 2fr;
`;
const cssP = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const cssBtnWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
  border: 1px solid white;
  position: relative;
`;
const cssIcons = css`
  color: #a12727;
  font-size: 1.6rem;
  border: 1px solid black;
`;

export { cssWrapper, cssP, cssBtnWrapper, cssIcons };
