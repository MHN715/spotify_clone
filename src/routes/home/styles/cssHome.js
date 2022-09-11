import { css } from "@emotion/react";
import "../../../variables.css";

const cssWrapper = css`
  background: linear-gradient(#000000, #000000e0);
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  position: relative;
`;

const cssMain = css`
  border: 1px solid white;
  flex-grow: 1;
  /* height: calc(100vh - var(--navHeight) - var(--playerHeight)); */
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  padding-bottom: calc(var(--navHeight) + var(--playerHeight) + 1rem);
`;

const cssHeading1 = css`
  color: #ffffff;
  font-size: 2rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.4rem;
`;

export { cssWrapper, cssMain, cssHeading1 };
