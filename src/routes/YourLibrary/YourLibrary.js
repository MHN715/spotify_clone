/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useContext, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Nav from "../../components/Nav/Nav";
import Player from "../../components/Player/Player";
import AccessTokenContext from "../../api/AccessTokenContext";
import { Link } from "react-router-dom";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function YourLibrary() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.getUserPlaylists("116591669").then(
      function (data) {
        setUserPlaylists(data.body.items);
        // console.log("Retrieved playlists", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    // spotifyApi.getMe().then(
    //   function (data) {
    //     console.log("Some information about the authenticated user", data.body);
    //   },
    //   function (err) {
    //     console.log("Something went wrong!", err);
    //   }
    // );
  }, []);

  console.log(userPlaylists);

  return (
    <div
      css={css`
        border: 2px solid blue;
        height: 100vh;
      `}
    >
      <main
        css={css`
          border: 2px solid pink;
          height: 100vh;
          overflow-y: scroll;
          display: grid;
        `}
      >
        <h1>Your Library</h1>
        <div
          css={css`
            /* width: 100vw; */
            justify-self: center;
            border: 3px solid yellow;
            /* height: 100%; */
            display: grid;
            grid-template-columns: auto auto;
            justify-items: center;
            gap: 1rem;
            margin-bottom: 5rem;
          `}
        >
          {userPlaylists.map((item) => {
            console.log(item);
            const imageUrl = item.images[0].url;
            const { id, name } = item;
            const { href } = item.tracks;
            return (
              <Link to={`/playlist/`} state={{ id: id, name: name }}>
                <div
                  css={css`
                    border: 1px solid green;
                    width: 40vw;
                    height: 40vw;
                  `}
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  <img src={imageUrl} alt="" style={{ width: "100%" }} />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Player spotifyApi={spotifyApi} />
      <Nav />
    </div>
  );
}
