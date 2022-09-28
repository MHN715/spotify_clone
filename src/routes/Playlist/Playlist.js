/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import AccessTokenContext from "../../api/AccessTokenContext";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";
import Nav from "../../components/Nav/Nav";
import Player from "../../components/Player/Player";
import PageLoadingScreenOverlay from "../../components/PageLoadingScreenOverlay/PageLoadingScreenOverlay";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Playlist() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [tracks, setTracks] = useState([]);
  const location = useLocation();
  const { id, name } = location.state;
  const {
    chosenTrack,
    setChosenTrack,
    chosenPlaylist,
    setChosenPlaylist,
    setCurrentlyPlayingName,
    currentlyPlayingName,
    chosenIndex,
    setChosenIndex,
    playing,
    setPlaying,
    spotifyWebPlaybackStatus,
  } = useContext(WhatsPlayingContext);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.getPlaylist(id).then(
      function (data) {
        setTracks(data.body.tracks.items);
        setIsLoadingPlaylist(false);
        console.log("Some information about this playlist", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, []);

  useEffect(() => {
    console.log("test");
    if (spotifyWebPlaybackStatus && !isLoadingPlaylist)
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
  }, [spotifyWebPlaybackStatus, isLoadingPlaylist]);

  function clicked(uri, index) {
    setChosenIndex(index);
    setChosenPlaylist(tracks);
    setChosenTrack(uri);
    setCurrentlyPlayingName(
      tracks[index].track.name + " - " + tracks[index].track.artists[0].name
    );
    setTimeout(() => {
      setPlaying(true);
    }, 500);
  }

  return (
    <div
      css={css`
        /* border: 1px solid pink; */
        height: 100vh;
        display: grid;
        grid-template-rows: 1fr 8fr;
      `}
    >
      <PageLoadingScreenOverlay isLoading={isLoading} />
      <header
        css={css`
          border: 5px solid blue;
        `}
      >
        <h1>{name}</h1>
      </header>
      <main
        css={css`
          border: 5px solid black;
          overflow-y: scroll;
        `}
      >
        <div
          css={css`
            display: grid;
            gap: 0.4rem;
          `}
        >
          {tracks.map((item, index) => {
            const { name, uri } = item.track;
            const artistName = item.track.album.name;
            const imgUrl = item.track.album.images[0]?.url;
            console.log(item);
            return (
              <div
                css={css`
                  border: 1px solid green;
                  height: 4rem;
                `}
                onClick={() => clicked(uri, index)}
              >
                <img src={imgUrl} height="100%" alt="" />
                {name} - {artistName}
              </div>
            );
          })}
        </div>
      </main>
      <Player />
      <Nav />
    </div>
  );
}
