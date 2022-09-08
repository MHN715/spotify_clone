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
import ComponentPlaylsits from "./components/ComponentPlaylists";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Home() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [featuredPlaylist, setFeaturedPlaylist] = useState([]);
  const [newLimit, setNewLimit] = useState(0);

  console.log(featuredPlaylist);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    recentTracksFunc(20, 0);
    savedTracksFunc(20, 0);
    featuredPlaylistFunc(20, 0);
  }, [accessToken]);

  return (
    <div css={cssWrapper}>
      <main css={cssMain}>
        <h1 css={cssHeading1}>Spotify decluttered</h1>
        <CompCarousel tracks={recentTracks} title="Recently Played" />
        <CompCarousel tracks={savedTracks} title="Saved Tracks" />
        <ComponentPlaylsits
          spotifyApi={spotifyApi}
          playlists={featuredPlaylist}
          accessToken={accessToken}
        />
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
          console.log("savedtracks:", savedTracks.body.items);
          setSavedTracks(savedTracks.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  function featuredPlaylistFunc(limit, offset) {
    spotifyApi
      .getFeaturedPlaylists({
        limit: limit,
        offset: offset,
        country: "SE",
        locale: "sv_SE",
        timestamp: "2014-10-23T09:00:00",
      })
      .then(
        function (data) {
          console.log("featured playlist:", data.body.playlists.items);
          setFeaturedPlaylist(data.body.playlists.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }
}
