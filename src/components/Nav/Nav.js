/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { cssNav, cssUl, cssLi, cssIcons, cssLink } from "./cssNav";
import { ReactComponent as Home_svg } from "../../icons/Home.svg";
import { ReactComponent as Search_svg } from "../../icons/Search.svg";
import { ReactComponent as Library_svg } from "../../icons/Library.svg";

export default function Nav() {
  return (
    <nav css={cssNav}>
      <ul css={cssUl}>
        <li css={cssLi}>
          <Home_svg css={cssIcons} />
          <Link to="/" css={cssLink}>
            Home
          </Link>
        </li>
        <li css={cssLi}>
          <Search_svg css={cssIcons} />
          <Link to="/search" css={cssLink}>
            Search
          </Link>
        </li>
        <li css={cssLi}>
          {" "}
          <Library_svg css={cssIcons} />
          <Link to="/your_library" css={cssLink}>
            Your Library
          </Link>
        </li>
      </ul>
    </nav>
  );
}
