export default function Login() {
  console.log(process.env.REACT_APP_CLIENTID);
  console.log(process.env.REACT_APP_REDIRECTURI);
  console.log(process.env.REACT_APP_SERVERURI);
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENTID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECTURI}&scope=  user-read-private%20user-read-email%20user-library-read%20user-library-modify%20streaming%20app-remote-control%20playlist-modify-private%20playlist-read-private%20playlist-modify-public%20playlist-read-collaborative%20user-top-read%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify%20user-read-currently-playing%20user-read-playback-state%20user-modify-playback-state%20ugc-image-upload`;

  return (
    <div>
      <a style={{ fontSize: "5rem" }} href={AUTH_URL}>
        login
      </a>
    </div>
  );
}
