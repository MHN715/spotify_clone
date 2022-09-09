import { css } from "@emotion/react";
import "../../variables.css";

const cssNav = css`
  border: 2px solid black;
  /* grid-row: 10/11; */
  position: -webkit-sticky;
  height: var(--navHeight);
  width: 100vw;
  position: fixed;
  bottom: 0;
`;
const cssUl = css`
  border: 1px solid red;
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
const cssFontAwesome = css`
  width: 100%;
  font-size: 1.8rem;
  color: #f9f9f9a6;
`;
const cssLink = css`
  align-items: center;
`;

export { cssNav, cssUl, cssLi, cssFontAwesome, cssLink };
