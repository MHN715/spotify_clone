/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import CarouselEndReachedContext from "../../Context/CarouselEndReachedContext";
import Nav from "../../components/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import Carousel from "./Carousel_component";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Home() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const carouselEndReached = useContext(CarouselEndReachedContext)[0];
  console.log(
    "Home: CarouselEndReached:",
    CarouselEndReachedContext._currentValue
  );

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 20,
      })
      .then(
        function (recentTracks) {
          setRecentTracks(recentTracks.body.items);
          // console.log(recentTracks);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMySavedTracks({
        limit: 20,
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
  }, [accessToken]);

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
