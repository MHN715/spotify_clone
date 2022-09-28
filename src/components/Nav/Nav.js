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
          <Link to="/" css={cssLink}>
            <HomeSvg css={cssIcons} />
            Home
          </Link>
        </li>
        <li css={cssLi}>
          <Link to="/search" css={cssLink}>
            <SearchSvg css={cssIcons} />
            Search
          </Link>
        </li>
        <li css={cssLi}>
          {" "}
          <Link to="/your_library" css={cssLink}>
            <LibrarySvg css={cssIcons} />
            Your Library
          </Link>
        </li>
      </ul>
    </nav>
  );
}
