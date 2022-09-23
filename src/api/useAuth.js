import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AccessTokenContext from "../api/AccessTokenContext";
import { useNavigate } from "react-router-dom";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const setToken = useContext(AccessTokenContext)[1];
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVERURI}/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((err) => {
        navigate("/");
        console.log(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    setInterval(() => {
      axios
        .post(`${process.env.REACT_APP_SERVERURI}/refresh`, {
          refreshToken,
        })
        .then((res) => {
          console.log("new token:", res.data.accessToken);
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          setToken(res.data.accessToken);
        })
        .catch((err) => {
          navigate("/");
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
