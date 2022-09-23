import { useState, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { StylesOptions } from "./spotifyReactWebPlaybackInterface";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";
import AccessTokenContext from "../../api/AccessTokenContext";

export default function ReactSpotifyWebPlayback() {
  const accessToken = useContext(AccessTokenContext)[0];
  const {
    chosenTrack,
    setChosenTrack,
    chosenPlaylist,
    setChosenPlaylist,
    chosenIndex,
    setChosenIndex,
    playing,
    setPlaying,
    currentlyPlayingName,
    setCurrentlyPlayingName,
    setReactSpotifyWebPlaybackStatus,
  } = useContext(WhatsPlayingContext);
  // console.log("hello from ReactSpotifyWebPlayback");

  return (
    <div style={{ display: "none" }}>
      <SpotifyPlayer
        token={accessToken}
        styles={StylesOptions}
        callback={(e) => {
          console.log("spotify callback", e);
          setReactSpotifyWebPlaybackStatus(e.status);
          if (e.track.name === "") return;
          setCurrentlyPlayingName(
            e.track.name + " - " + e.track.artists[0].name
          );
          e.isPlaying && setPlaying(true);
          !e.isPlaying && setPlaying(false);
        }}
        uris={chosenTrack ? [chosenTrack] : []}
        play={playing}
      />
    </div>
  );
}
