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
import { BiArrowBack } from "react-icons/bi";
import { MdPlayCircleFilled, MdOutlinePauseCircleFilled } from "react-icons/md";

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
    setImageUrl,
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
    setImageUrl(chosenPlaylist[index].track.album.images[1].url);
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
        background: linear-gradient(
          #003d38,
          #000000,
          #000000,
          #000000,
          #000000
        );
      `}
    >
      <PageLoadingScreenOverlay isLoading={isLoading} />
      <header
        css={css`
          /* height: 1vh; */
          color: white;
          display: grid;
          position: relative;
          padding-left: 0.6rem;
        `}
      >
        <BiArrowBack
          css={css`
            font-size: 1.5rem;
            position: relative;
            top: 0.4rem;
          `}
        />
        <h1
          css={css`
            font-size: 1.2rem;
          `}
        >
          {name}
        </h1>
        <MdPlayCircleFilled
          css={css`
            position: absolute;
            right: 0.5rem;
            top: 50%;
            font-size: 3.2rem;
            color: #1ed760;
          `}
        />
      </header>
      <main
        css={css`
          /* border: 5px solid black; */
          overflow-y: scroll;
          color: white;
          padding-bottom: 11rem;
          margin: 0 0.6rem;
        `}
      >
        <div
          css={css`
            display: grid;
            gap: 0.9rem;
          `}
        >
          {tracks.map((item, index) => {
            const { name, uri } = item.track;
            const artistName = item.track.album.name;
            const imgUrl = item.track.album.images[0]?.url;
            // console.log(item);
            return (
              <div
                css={css`
                  /* border: 1px solid green; */
                  height: 4rem;
                  display: flex;
                  align-items: center;
                `}
                onClick={() => clicked(uri, index)}
              >
                <img
                  src={imgUrl}
                  height="100%"
                  alt=""
                  css={css`
                    border-radius: 0.6rem;
                  `}
                />
                <div
                  css={css`
                    margin-left: 0.7rem;
                  `}
                >
                  {" "}
                  <p
                    css={css`
                      font-size: 1;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      max-width: 70vw;
                    `}
                  >
                    {name}
                  </p>
                  <p
                    css={css`
                      color: #bebebe;
                      font-size: 0.8rem;
                      white-space: nowrap;
                      overflow: hidden;
                      max-width: 70vw;
                      text-overflow: ellipsis;
                    `}
                  >
                    {" "}
                    {artistName}
                  </p>
                </div>
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
