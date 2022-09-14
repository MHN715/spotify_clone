/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import Nav from "../../components/Nav/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import CompCarousel from "./components/CompCarousel";
import Player from "../../components/Player/Player";
import { cssWrapper, cssMain, cssHeading1 } from "./styles/cssHome";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Home() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [recentTracks, setRecentTracks] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [newLimit, setNewLimit] = useState(0);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    getRecentTracks(20, 0);
    getSavedTracks(20, 0);
    getFeaturedPlaylists(20, 0);
    getNewReleases(20, 0);
  }, [accessToken]);

  return (
    <div css={cssWrapper}>
      <main css={cssMain}>
        <h1 css={cssHeading1}>Spotify decluttered</h1>
        <CompCarousel
          items={recentTracks}
          title="Recently Played"
          isItPlaylists={false}
          isItAlbums={false}
        />
        <CompCarousel
          items={featuredPlaylists}
          title="Featured Playlists"
          isItPlaylists={true}
          isItAlbums={false}
          spotifyApi={spotifyApi}
        />
        <CompCarousel
          items={newReleases}
          title="New Releases"
          isItPlaylists={false}
          isItAlbums={true}
          spotifyApi={spotifyApi}
        />
        <CompCarousel
          items={savedTracks}
          title="Saved Tracks"
          isItPlaylists={false}
          isItAlbums={false}
        />
      </main>
      <Player spotifyApi={spotifyApi} accessToken={accessToken} />
      <Nav />
    </div>
  );

  function getRecentTracks(limit, offset) {
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: limit,
        offset: offset,
      })
      .then(
        function (recentTracks) {
          console.log(recentTracks);
          setRecentTracks(recentTracks.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  function getSavedTracks(limit, offset) {
    spotifyApi
      .getMySavedTracks({
        limit: newLimit + limit,
        offset: offset,
      })
      .then(
        function (savedTracks) {
          // console.log("savedtracks:", savedTracks.body.items);
          setSavedTracks(savedTracks.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  function getFeaturedPlaylists(limit, offset) {
    spotifyApi
      .getFeaturedPlaylists({
        limit: limit,
        offset: offset,
      })
      .then(
        function (data) {
          setFeaturedPlaylists(data.body.playlists.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }

  function getNewReleases() {
    spotifyApi.getNewReleases({ limit: 5, offset: 0 }).then(
      function (data) {
        console.log(data.body);
        setNewReleases(data.body.albums.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }
}
