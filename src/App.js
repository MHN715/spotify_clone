import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AccessTokenContext from "./api/AccessTokenContext";
import WhatsPlayingContext from "./Context/WhatsPlayingContext";
import WebPlaybackSDK from "./components/WebPlaybackSDK/WebPlaybackSDK";

const Login = lazy(() => import("./routes/login/Login"));
const Callback = lazy(() => import("./routes/callback/Callback"));
const Home = lazy(() => import("./routes/home/Home"));
const Search = lazy(() => import("./routes/search/Search"));
const Playlist = lazy(() => import("./routes/Playlist/Playlist"));
const YourLibrary = lazy(() => import("./routes/YourLibrary/YourLibrary"));

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  var accessTokenState = useState(null);
  var [chosenTrack, setChosenTrack] = useState(null);
  var [chosenId, setChosenId] = useState("");
  var [chosenPlaylist, setChosenPlaylist] = useState([]);
  var [chosenIndex, setChosenIndex] = useState(null);
  var [playing, setPlaying] = useState(false);
  var [currentlyPlayingName, setCurrentlyPlayingName] = useState("");
  var [spotifyWebPlaybackStatus, setSpotifyWebPlaybackStatus] = useState(null);
  var [playerSDK, setPlayerSDK] = useState({});
  var [duration, setDuration] = useState(0);
  var [currentDuration, setCurrentDuration] = useState(0);

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
          spotifyWebPlaybackStatus,
          setSpotifyWebPlaybackStatus,
          playerSDK,
          setPlayerSDK,
          chosenId,
          setChosenId,
          duration,
          setDuration,
          currentDuration,
          setCurrentDuration,
        }}
      >
        {(() => {
          if (accessTokenState[0])
            return <WebPlaybackSDK accessToken={accessTokenState} />;
        })()}

        <Suspense fallback={<p>loading...</p>}>
          <Routes>
            {(() => {
              if (accessTokenState[0])
                return (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="search" element={<Search />} />
                    <Route path="playlist" element={<Playlist />} />
                    <Route path="your_library" element={<YourLibrary />} />
                    <Route path="playlist/:id" element={<Playlist />} />
                  </>
                );
            })()}
            <Route path="*" element={<Login />} />
            <Route path="/callback" element={<Callback code={code} />} />;
          </Routes>
        </Suspense>
      </WhatsPlayingContext.Provider>
    </AccessTokenContext.Provider>
  );
}

export default App;
