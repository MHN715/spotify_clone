/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import CarouselEndReachedContext from "../../Context/CarouselEndReachedContext";
import Nav from "../../components/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import Carousel from "./Carousel_component";
import axios from "axios";
import Search_component from "../../components/Search_component";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Home() {
  const accessToken = useContext(AccessTokenContext)[0];
  const {
    carouselEndReached1,
    setCarouselEndReached1,
    carouselEndReached2,
    setCarouselEndReached2,
  } = useContext(CarouselEndReachedContext);
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [newLimit, setNewLimit] = useState(0);

  // console.log("carouselEndReached:", carouselEndReached);
  recentTracks.forEach((lol) => console.log(lol.track.name));
  console.log(
    "carouselEndReached1",
    carouselEndReached1,
    "carouselEndReached2",
    carouselEndReached2
  );

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
    // if (carouselEndReached1) {
    //   setNewLimit(newLimit + 10);
    //   console.log("newLimit:", typeof newLimit, newLimit);
    //   setCarouselEndReached1(false);
    // }
    // console.log("new value of newLimit:", newLimit);
    spotifyApi
      .getMySavedTracks({
        limit: newLimit + limit,
        offset: offset,
      })
      .then(
        function (savedTracks) {
          setSavedTracks(savedTracks.body.items);
          // console.log(savedTracks);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  useEffect(() => {
    if (!accessToken) return;

    recentTracksFunc(10, 0);
    savedTracksFunc(5, 0);
  }, [accessToken, carouselEndReached1]);

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
          background: #000000;
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
        <Search_component />
      </main>

      <Nav />
    </div>
  );
}
