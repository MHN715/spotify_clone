import { css } from "@emotion/react";

const cssWrapper = css`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const cssImg = css`
  border-radius: 20px;
  box-shadow: 1px 3px 7px 3px #00000045;
`;

const cssHeading2_1 = css`
  color: white;
`;

const cssHeading2_2 = css`
  font-size: 0.9rem;
  color: white;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.2rem;
`;

const cssCostumSwiper = css`
  width: 100vw;
  height: 9.2rem;
  padding: 0 0.3rem;
`;

export { cssWrapper, cssImg, cssHeading2_1, cssHeading2_2, cssCostumSwiper };
