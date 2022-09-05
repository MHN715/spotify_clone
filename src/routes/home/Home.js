/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import Nav from "../../components/Nav/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import CompCarousel from "./components/CompCarousel";
import Player from "../../components/Player/Player";
import axios from "axios";
import { cssWrapper, cssMain, cssHeading1 } from "./styles/cssHome";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Home() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [newLimit, setNewLimit] = useState(0);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    recentTracksFunc(20, 0);
    savedTracksFunc(20, 0);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.getMe().then(
      function (data) {
        console.log("Some information about the authenticated user", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    spotifyApi.getUserPlaylists("thelinmichael").then(
      function (data) {
        console.log("Retrieved playlists", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, []);

  return (
    <div css={cssWrapper}>
      <main css={cssMain}>
        <h1 css={cssHeading1}>Spotify decluttered</h1>
        <CompCarousel tracks={recentTracks} title="Recently Played" />
        <CompCarousel tracks={savedTracks} title="Saved Tracks" />
      </main>
      <Player spotifyApi={spotifyApi} accessToken={accessToken} />
      ; <Nav />
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
    spotifyApi
      .getMySavedTracks({
        limit: newLimit + limit,
        offset: offset,
      })
      .then(
        function (savedTracks) {
          console.log("savedtracks:", savedTracks);
          setSavedTracks(savedTracks.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }
}
