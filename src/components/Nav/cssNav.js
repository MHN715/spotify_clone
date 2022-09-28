import { css } from "@emotion/react";
import "../../variables.css";

const cssNav = css`
  /* border: 2px solid red; */
  background: linear-gradient(#000000b8, #000000e3, black, black);
  /* grid-row: 10/11; */
  height: var(--navHeight);
  width: 100vw;
  position: fixed;
  bottom: 0;
  z-index: 1000;
`;
const cssUl = css`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
`;
const cssLi = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const cssIcons = css`
  font-size: 1.3rem;
  width: 2rem;
  height: 2rem;
`;
const cssLink = css`
  align-items: center;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
`;

export { cssNav, cssUl, cssLi, cssIcons, cssLink };
