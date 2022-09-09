import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./routes/login/Login";
import Callback from "./routes/callback/Callback";
import Home from "./routes/home/Home";
import Search from "./routes/search/Search";

import AccessTokenContext from "./api/AccessTokenContext";
import WhatsPlayingContext from "./Context/WhatsPlayingContext";
import ReactSpotifyWebPlayback from "./components/ReactSpotifyWebPlayback/ReactSpotifyWebPlayback";

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
            return <ReactSpotifyWebPlayback accessToken={accessTokenState} />;
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
