/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import CarouselEndReachedContext from "../../Context/CarouselEndReachedContext";
import Nav from "../../components/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import Carousel from "./Carousel_component";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Home() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [carouselEndReached, setCarouselEndReached] = useContext(
    CarouselEndReachedContext
  );
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  // const [newLimit, setNewLimit] = useState(0);

  // console.log("carouselEndReached:", carouselEndReached);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  function recentTracksFunc(limit, offset) {
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: limit,
        offset: offset,
      })
      .then(
        function (recentTracks) {
          setRecentTracks(recentTracks.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  function savedTracksFunc(limit, offset) {
    // if (carouselEndReached) {
    //   setNewLimit(newLimit + 10);
    //   console.log("newLimit:", typeof newLimit, newLimit);
    //   setCarouselEndReached(false);
    // }
    // console.log("new value of newLimit:", newLimit);
    spotifyApi
      .getMySavedTracks({
        limit: limit,
        offset: offset,
      })
      .then(
        function (savedTracks) {
          setSavedTracks(savedTracks.body.items);
          console.log(savedTracks);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  useEffect(() => {
    if (!accessToken) return;

    savedTracksFunc(50, 0);
    recentTracksFunc(50, 0);
  }, [accessToken, carouselEndReached]);

  return (
    <div
      css={css`
        height: 100vh;
        display: grid;
        grid-template-rows: repeat(12, 1fr);
        position: relative;
      `}
    >
      <main
        css={css`
          background: #000000ad;
          height: 100vh;
          display: flex;
          flex-direction: column;
        `}
      >
        <h1
          css={css`
            color: white;
            font-size: 2rem;
            text-align: center;
          `}
        >
          Spotify decluttered
        </h1>
        <Carousel tracks={recentTracks} title="Recently Played" />
        <Carousel tracks={savedTracks} title="Saved Tracks" />
      </main>

      <Nav />
    </div>
  );
}
