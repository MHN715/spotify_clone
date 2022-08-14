import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import Callback from "./routes/Callback";
import Home from "./routes/home/Home";
import Search from "./routes/Search";

import AccessTokenContext from "./api/AccessTokenContext";
import CarouselEndReachedContext from "./Context/CarouselEndReachedContext";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  var accessTokenState = useState(null);
  var carouselEndReached = useState(false);

  return (
    <AccessTokenContext.Provider value={accessTokenState}>
      <CarouselEndReachedContext.Provider value={carouselEndReached}>
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
      </CarouselEndReachedContext.Provider>
    </AccessTokenContext.Provider>
  );
}

export default App;
