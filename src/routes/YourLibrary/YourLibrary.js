/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useContext, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Nav from "../../components/Nav/Nav";
import Player from "../../components/Player/Player";
import AccessTokenContext from "../../api/AccessTokenContext";
import { Link } from "react-router-dom";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";
import PageLoadingScreenOverlay from "../../components/PageLoadingScreenOverlay/PageLoadingScreenOverlay";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function YourLibrary() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isLoadingUserPlaylists, setIsLoadingUserPlaylsits] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { spotifyWebPlaybackStatus } = useContext(WhatsPlayingContext);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    console.log("test");
    if (spotifyWebPlaybackStatus && !isLoadingUserPlaylists)
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
  }, [spotifyWebPlaybackStatus, isLoadingUserPlaylists]);

  useEffect(() => {
    spotifyApi.getUserPlaylists("116591669").then(
      function (data) {
        setUserPlaylists(data.body.items);
        setIsLoadingUserPlaylsits(false);
        // console.log("Retrieved playlists", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, []);

  console.log(userPlaylists);

  return (
    <div
      css={css`
        /* border: 2px solid blue; */
        height: 100vh;
        overflow: hidden;
      `}
    >
      <PageLoadingScreenOverlay isLoading={isLoading} />
      <main
        css={css`
          /* border: 2px solid pink; */
          height: 100vh;
          overflow-y: scroll;
          display: grid;
          background: black;
        `}
      >
        <h1
          css={css`
            color: white;
            margin-top: 1rem;
            margin-bottom: 1.3rem;
            display: flex;
            justify-content: center;
          `}
        >
          Your Library
        </h1>
        <div
          css={css`
            /* width: 100vw; */
            justify-self: center;
            /* border: 3px solid yellow; */
            /* height: 100%; */
            display: grid;
            grid-template-columns: auto auto;
            justify-items: center;
            gap: 1rem;
            margin-bottom: 5rem;
          `}
        >
          {userPlaylists.map((item) => {
            // console.log(item);
            console.log(item.images[0]);
            const imageUrl = item.images[0]?.url;
            const { id, name } = item;
            const { href } = item.tracks;
            return (
              <Link
                css={css`
                  text-decoration: none;
                `}
                key={id}
                to={`/playlist/`}
                state={{ id: id, name: name }}
              >
                <div
                  css={css`
                    /* border: 1px solid green; */
                    width: 40vw;
                    height: 40vw;
                  `}
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  {!imageUrl ? (
                    <p
                      css={css`
                        background: #1d1c31;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 2rem;
                        color: white;
                        border-radius: 0.4rem;
                      `}
                    >
                      {item.name}
                    </p>
                  ) : (
                    <img
                      src={imageUrl}
                      alt=""
                      style={{ width: "100%" }}
                      css={css`
                        border-radius: 0.4rem;
                      `}
                    />
                  )}
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
