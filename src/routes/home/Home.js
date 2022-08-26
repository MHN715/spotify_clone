/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import ContextCarouselEndReached from "../../Context/ContextCarouselEndReached";
import Nav from "../../components/Nav/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import Comp_carousel from "./components/Comp_carousel";
import Player from "../../components/Player/Player";
import axios from "axios";
import { cssWrapper, cssMain, cssHeading1 } from "./styles/cssMain";

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
  } = useContext(ContextCarouselEndReached);
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [newLimit, setNewLimit] = useState(0);

  // console.log("carouselEndReached:", carouselEndReached);
  // recentTracks.forEach((lol) => console.log(lol.track.name));
  // console.log(
  //   "carouselEndReached1",
  //   carouselEndReached1,
  //   "carouselEndReached2",
  //   carouselEndReached2
  // );

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    recentTracksFunc(10, 0);
    savedTracksFunc(5, 0);
  }, [accessToken, carouselEndReached1]);

  useEffect(() => {
    spotifyApi.getMyDevices().then(
      function (data) {
        let availableDevices = data.body.devices;
        console.log("availableDevices:", availableDevices);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  return (
    <div css={cssWrapper}>
      <main css={cssMain}>
        <h1 css={cssHeading1}>Spotify decluttered</h1>
        <Comp_carousel tracks={recentTracks} title="Recently Played" />
        <Comp_carousel tracks={savedTracks} title="Saved Tracks" />
      </main>
      <Player spotifyApi={spotifyApi} />
      <Nav />
    </div>
  );

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
}
