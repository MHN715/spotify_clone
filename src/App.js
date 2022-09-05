import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./routes/login/Login";
import Callback from "./routes/callback/Callback";
import Home from "./routes/home/Home";
import Search from "./routes/search/Search";

import AccessTokenContext from "./api/AccessTokenContext";
import WhatsPlayingContext from "./Context/WhatsPlayingContext";

import SpotifyPlayer from "react-spotify-web-playback";
import { StylesOptions } from "./spotifyReactWebPlaybackInterface";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  var accessTokenState = useState(null);
  var [chosenTrack, setChosenTrack] = useState(null);
  var [chosenPlaylist, setChosenPlaylist] = useState([]);
  var [chosenIndex, setChosenIndex] = useState(null);
  var [playing, setPlaying] = useState(false);
  var [currentlyPlayingName, setCurrentlyPlayingName] = useState("");

  return (
    <AccessTokenContext.Provider value={accessTokenState}>
      <WhatsPlayingContext.Provider
        value={{
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
        }}
      >
        {(() => {
          if (accessTokenState[0])
            return (
              <div style={{ display: "none" }}>
                <SpotifyPlayer
                  token={accessTokenState[0]}
                  styles={StylesOptions}
                  callback={(e) => {
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
        })()}

        <Routes>
          {(() => {
            if (accessTokenState[0])
              return (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="search" element={<Search />} />
                </>
              );
          })()}
          <Route path="*" element={<Login />} />
          <Route path="/callback" element={<Callback code={code} />} />;
        </Routes>
      </WhatsPlayingContext.Provider>
    </AccessTokenContext.Provider>
  );
}

export default App;
