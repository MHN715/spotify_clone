import { css, keyframes } from "@emotion/react";
import "../../../variables.css";

const cssWrapper = css`
  /* border: 2px solid blue; */
  background: rgba(1, 4, 15, 0.954);
  /* background: black; */
  height: var(--playerHeight);
  width: 96vw;
  left: 2vw;
  /* position: sticky; */
  position: fixed;
  bottom: 4rem;
  z-index: 600;
  display: grid;
  grid-template-columns: 7fr 4fr;
  border-radius: 0.7rem;
`;

export { cssWrapper };
