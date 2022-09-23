import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AccessTokenContext from "../api/AccessTokenContext";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const setToken = useContext(AccessTokenContext)[1];
  console.log(expiresIn);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVERURI}/login`, {
        code,
      })
      .then((res) => {
        // window.history.pushState({}, null, "/");
        console.log(res);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((err) => {
        // window.location = "/";
        console.log(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${process.env.REACT_APP_SERVERURI}/refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          setToken(res.data.accessToken);
        })
        .catch((err) => {
          // window.location = "/";
          console.log(err);
        });
    }, (expiresIn - 3600) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, setToken]);

  return accessToken;
}
