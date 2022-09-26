import { useState, useEffect, useContext } from "react";
import WhatsPlayingContext from "../../Context/WhatsPlayingContext";
import AccessTokenContext from "../../api/AccessTokenContext";

export default function WebPlaybackSDK() {
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
    setSpotifyWebPlaybackStatus,
    setPlayerSDK,
    playerSDK,
    chosenId,
    setDuration,
    setCurrentDuration,
  } = useContext(WhatsPlayingContext);
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  // const [current_track, setTrack] = useState(track);

  console.log(player);
  console.log(chosenId);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 1,
      });

      setPlayerSDK(player);
      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
        setSpotifyWebPlaybackStatus(true);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
        setSpotifyWebPlaybackStatus(false);
      });

      player.connect();

      player.addListener("player_state_changed", (state) => {
        console.log(state);
        if (!state) {
          return;
        }

        setPlaying(state.paused ? false : true);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
          // console.log("state: ", state);
          setDuration(state.duration);
          setCurrentDuration(state.position);
        });
      });
    };
  }, []);

  useEffect(() => {
    if (!deviceId || !chosenTrack) return;
    console.log("put");
    console.log(deviceId);
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [chosenTrack] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, [deviceId, chosenTrack]);

  return null;
}
