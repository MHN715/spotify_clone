import { css } from "@emotion/react";

const cssWrapper = css`
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  position: relative;
`;

const cssMain = css`
  background: #000000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const cssHeading1 = css`
  color: white;
  font-size: 2rem;
  text-align: center;
`;

export { cssWrapper, cssMain, cssHeading1 };
