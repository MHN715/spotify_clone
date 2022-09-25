import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AccessTokenContext from "./api/AccessTokenContext";
import WhatsPlayingContext from "./Context/WhatsPlayingContext";
import ReactSpotifyWebPlayback from "./components/ReactSpotifyWebPlayback/ReactSpotifyWebPlayback";

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
        }}
      >
        {(() => {
          if (accessTokenState[0])
            return <ReactSpotifyWebPlayback accessToken={accessTokenState} />;
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
