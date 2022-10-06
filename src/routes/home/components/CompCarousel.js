/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
import { FreeMode, Lazy } from "swiper";
import {
  cssWrapper,
  cssImg,
  cssHeading2_1,
  cssHeading2_2,
  cssCostumSwiper,
} from "../styles/cssCompCarpusel";
import WhatsPlayingContext from "../../../Context/WhatsPlayingContext";

export default function CompCarousel({
  items,
  title,
  isItPlaylists,
  isItAlbums,
  spotifyApi,
  accessToken,
}) {
  const [sortedTracks, setSortedTracks] = useState([]);
  const [firstClick, setFirstClick] = useState(true);
  const {
    chosenTrack,
    setChosenTrack,
    chosenPlaylist,
    setChosenPlaylist,
    setCurrentlyPlayingName,
    currentlyPlayingName,
    chosenIndex,
    setChosenIndex,
    playing,
    setPlaying,
    playerSDK,
    setChosenId,
    setImageUrl,
  } = useContext(WhatsPlayingContext);

  // console.log("chosenIndex,", chosenIndex);

  // console.log(isItAlbums);

  //      function to use as refference:

  // if (chosenTrack === uri && chosenIndex === index) {
  //   setPlaying(true);
  // }
  function clicked(uri, index) {
    console.log("clicked");
    setChosenIndex(index);
    setChosenPlaylist(sortedTracks);
    setChosenTrack(uri);
    // setImageUrl(chosenPlaylist[index]?.track.album.images[1].url);
    setCurrentlyPlayingName(
      sortedTracks[index].track.name +
        " - " +
        sortedTracks[index].track.artists[0].name
    );
    setTimeout(() => {
      setPlaying(true);
    }, 500);
  }

  // useEffect(() => {
  //   console.log("playing set to true");
  //   setPlaying(true);
  // }, [setChosenTrack]);

  useEffect(() => {
    if (isItPlaylists || isItAlbums) return;
    const result = items?.reduce((sortedArray, currentObj) => {
      let dublicateObj = sortedArray.find(
        (item) => item.track.id === currentObj.track.id
      );
      if (dublicateObj) return sortedArray;

      return sortedArray.concat([currentObj]);
    }, []);

    setSortedTracks(result);
  }, [items]);

  // useEffect(() => {
  //   if (!isItPlaylists || isItAlbums) return;
  //   items.map((item) => {
  //     // console.log(item.id);
  //     spotifyApi.getPlaylist(item.id).then(
  //       function (data) {
  //         // console.log("Some information about this playlist", data.body);
  //       },
  //       function (err) {
  //         console.log("Something went wrong!", err);
  //       }
  //     );
  //   });
  // }, [items]);

  return (
    <div css={cssWrapper}>
      <h2 css={cssHeading2_1}>{title}</h2>{" "}
      <div
        css={css`
          border: 4px solid blue;
          display: flex;
          overflow-x: scroll;
          gap: 1rem;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          /* Hide scrollbar for Chrome, Safari and Opera */
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        {(() => {
          if (!isItPlaylists && !isItAlbums) {
            return sortedTracks.map((item, index) => {
              const { id, name, uri } = item.track;
              const image = item.track.album.images[1].url;
              // console.log(uri);
              return (
                <div
                  css={css`
                    border: 2px solid white;
                    /* width: 35vw; */
                  `}
                  key={id}
                  onClick={() => {
                    clicked(uri, index);
                    setImageUrl(image);
                    setChosenId(id);

                    // playerSDK.play({ uri });
                  }}
                >
                  <img
                    src={image}
                    alt={name}
                    // width="100%"
                    // height="width"
                    css={cssImg}
                  />
                  <h2 css={cssHeading2_2}></h2>
                </div>
              );
            });
          } else if (isItPlaylists && !isItAlbums) {
            return items.map((item, index) => {
              const { id, name, uri } = item;
              const image = item.images[0]?.url;

              return (
                <div key={id}>
                  <div
                    // css={cssWrapper}
                    onClick={() => console.log("clicked")}
                  >
                    <img
                      src={image}
                      alt={name}
                      // width="100%"
                      // height="width"
                      css={cssImg}
                    />

                    <h2 css={cssHeading2_2}></h2>
                  </div>
                </div>
              );
            });
          } else if (isItAlbums) {
            return items.map((item) => {
              // console.log("newReleases", item);
              const { id, name } = item;
              const image = item.images[2].url;
              // console.log(image);
              return (
                <div
                  key={id}
                  onClick={() => {
                    console.log("playlists selected");
                    // console.log(index, item);
                    // console.log(sortedTracks[index]);
                    // console.log(sortedTracks);
                    // setChosenTrack(uri);
                    // setChosenPlaylist(sortedTracks);
                    // setChosenIndex(index);
                    // setPlaying(true);
                  }}
                >
                  {" "}
                  <div
                  // css={cssWrapper}
                  >
                    <img
                      className="image swiper-lazy"
                      src={image}
                      alt={name}
                      // width="100%"
                      // height="width"
                      css={cssImg}
                    />
                    <h2 css={cssHeading2_2}></h2>
                  </div>
                </div>
              );
            });
          }
        })()}
      </div>
    </div>
  );
}
