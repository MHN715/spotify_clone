/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import AccessTokenContext from "../../api/AccessTokenContext";
import Nav from "../../components/Nav";
import SpotifyWebApi from "spotify-web-api-node";
import Carousel from "./Carousel_component";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Home() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [recentTracks, setRecentTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 10,
      })
      .then(
        function (recentTracks) {
          setRecentTracks(recentTracks.body.items);
          console.log(recentTracks);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }, [accessToken]);

  return (
    <div
      css={css`
        background: lime;
        height: 100vh;
        display: grid;
        grid-template-rows: repeat(12, 1fr);
        position: relative;
      `}
    >
      <main
        css={css`
          background: lightblue;
          height: 100vh;
        `}
      >
        {/* {recentTracks.map((recentTrack) => {
          const { id, uri, href, name } = recentTrack.track.album;
          const image = recentTrack.track.album.images[2];
          console.log(id, name, image);
        })} */}
        <Carousel tracks={recentTracks} title="Recently Played" />
      </main>

      <Nav />
    </div>
  );
}
