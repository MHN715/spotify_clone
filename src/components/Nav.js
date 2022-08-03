/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav
      css={css`
        border: 2px solid black;
        /* grid-row: 10/11; */
        position: -webkit-sticky;
        height: 4rem;
        width: 100vw;
        position: fixed;
        bottom: 0;
      `}
    >
      <ul
        css={css`
          border: 1px solid red;
          display: flex;
          justify-content: space-around;
          list-style: none;
          margin: 0;
          padding: 0;
        `}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="search">Search</Link>
        </li>
        <li>
          {" "}
          <Link to="library">Your Library</Link>
        </li>
      </ul>
    </nav>
  );
}
