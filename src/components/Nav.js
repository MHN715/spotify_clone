/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

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
          /* border: 1px solid red; */
          display: flex;
          justify-content: space-around;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;
        `}
      >
        <li css={liCss}>
          <FontAwesomeIcon icon={faHouse} css={fontAweSomeCss} />
          <Link to="/" css={linkCss}>
            Home
          </Link>
        </li>
        <li css={liCss}>
          <FontAwesomeIcon icon={faMagnifyingGlass} css={fontAweSomeCss} />
          <Link to="/search" css={linkCss}>
            Search
          </Link>
        </li>
        <li css={liCss}>
          {" "}
          <FontAwesomeIcon icon={faBook} css={fontAweSomeCss} />
          <Link to="/library" css={linkCss}>
            Your Library
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const liCss = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const fontAweSomeCss = css`
  width: 100%;
  font-size: 1.8rem;
  color: #f9f9f9a6;
`;
const linkCss = css`
  align-items: center;
`;
