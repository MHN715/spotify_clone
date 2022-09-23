/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { cssNav, cssUl, cssLi, cssIcons, cssLink } from "./cssNav";
import { ReactComponent as HomeSvg } from "../../icons/Home.svg";
import { ReactComponent as SearchSvg } from "../../icons/Search.svg";
import { ReactComponent as LibrarySvg } from "../../icons/Library.svg";

export default function Nav() {
  return (
    <nav css={cssNav}>
      <ul css={cssUl}>
        <li css={cssLi}>
          <HomeSvg css={cssIcons} />
          <Link to="/" css={cssLink}>
            Home
          </Link>
        </li>
        <li css={cssLi}>
          <SearchSvg css={cssIcons} />
          <Link to="/search" css={cssLink}>
            Search
          </Link>
        </li>
        <li css={cssLi}>
          {" "}
          <LibrarySvg css={cssIcons} />
          <Link to="/your_library" css={cssLink}>
            Your Library
          </Link>
        </li>
      </ul>
    </nav>
  );
}
