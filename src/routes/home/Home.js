/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import Nav from "../../components/Nav/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import CompCarousel from "./components/CompCarousel";
import Player from "../../components/Player/Player";
import SpotifyPlayer from "react-spotify-web-playback";
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

  return (
    <div css={cssWrapper}>
      <main css={cssMain}>
        <h1 css={cssHeading1}>Spotify decluttered</h1>
        <CompCarousel tracks={recentTracks} title="Recently Played" />
        <CompCarousel tracks={savedTracks} title="Saved Tracks" />
        <Player spotifyApi={spotifyApi} />
      </main>
      <div
        css={css`
          /* border: 3px solid blue; */
          position: sticky;
          position: fixed;
          bottom: 4rem;
          width: 100vw;
          z-index: 400;
          /* display: none; */
        `}
      >
        <SpotifyPlayer
          token={accessToken}
          uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
          styles={{
            activeColor: "#fff",
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
            height: "4rem",
          }}
        />
      </div>
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
          setSavedTracks(savedTracks.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }
}
