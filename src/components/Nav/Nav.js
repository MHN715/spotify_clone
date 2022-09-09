/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { cssNav, cssUl, cssLi, cssFontAwesome, cssLink } from "./cssNav";

export default function Nav() {
  return (
    <nav css={cssNav}>
      <ul css={cssUl}>
        <li css={cssLi}>
          <FontAwesomeIcon icon={faHouse} css={cssFontAwesome} />
          <Link to="/" css={cssLink}>
            Home
          </Link>
        </li>
        <li css={cssLi}>
          <FontAwesomeIcon icon={faMagnifyingGlass} css={cssFontAwesome} />
          <Link to="/search" css={cssLink}>
            Search
          </Link>
        </li>
        <li css={cssLi}>
          {" "}
          <FontAwesomeIcon icon={faBook} css={cssFontAwesome} />
          <Link to="/library" css={cssLink}>
            Your Library
          </Link>
        </li>
      </ul>
    </nav>
  );
}
