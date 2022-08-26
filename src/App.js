import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./routes/login/Login";
import Callback from "./routes/callback/Callback";
import Home from "./routes/home/Home";
import Search from "./routes/search/Search";

import AccessTokenContext from "./api/AccessTokenContext";
import ContextCarouselEndReached from "./Context/ContextCarouselEndReached";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  var accessTokenState = useState(null);
  var [carouselEndReached1, setCarouselEndReached1] = useState(false);
  var [carouselEndReached2, setCarouselEndReached2] = useState(false);

  return (
    <AccessTokenContext.Provider value={accessTokenState}>
      <ContextCarouselEndReached.Provider
        value={{
          carouselEndReached1,
          setCarouselEndReached1,
          carouselEndReached2,
          setCarouselEndReached2,
        }}
      >
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
      </ContextCarouselEndReached.Provider>
    </AccessTokenContext.Provider>
  );
}

export default App;
