/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import { cssNav, cssUl, cssLi, cssIcons, cssLink } from "./cssNav";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";

export default function Nav() {
  return (
    <nav css={cssNav}>
      <ul css={cssUl}>
        <li css={cssLi}>
          <Link to="/" css={cssLink}>
            <AiOutlineHome css={cssIcons} />
            Home
          </Link>
        </li>
        <li css={cssLi}>
          <Link to="/search" css={cssLink}>
            <FiSearch css={cssIcons} />
            Search
          </Link>
        </li>
        <li css={cssLi}>
          {" "}
          <Link to="/your_library" css={cssLink}>
            <VscLibrary css={cssIcons} />
            Your Library
          </Link>
        </li>
      </ul>
    </nav>
  );
}
