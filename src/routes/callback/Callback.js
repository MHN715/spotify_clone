import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccessTokenContext from "../../api/AccessTokenContext";
import useAuth from "../../api/useAuth";

export default function Callback({ code }) {
  const accessToken = useAuth(code);
  const setToken = useContext(AccessTokenContext)[1];
  let navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
    setToken(accessToken);
    navigate("/");
  }, [accessToken, navigate, setToken]);

  return <div>callback, loading site</div>;
}
