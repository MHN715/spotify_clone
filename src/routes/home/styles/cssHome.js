import { css } from "@emotion/react";
import "../../../variables.css";

const cssWrapper = css`
  background: black;
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
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
`;

export { cssWrapper, cssMain, cssHeading1 };
