import { useContext, useState, useEffect } from "react";
import AccessTokenContext from "../api/AccessTokenContext";
import SpotifyWebApi from "spotify-web-api-node";
import Nav from "../components/Nav";

const spotifyApi = new SpotifyWebApi({
  clientId: "84a9b541a3dc46038b865300f1d671e4",
});

export default function Search_component() {
  const accessToken = useContext(AccessTokenContext)[0];
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  console.log(searchRes);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchRes([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchRes(
        res.body.tracks.items.map((track) => {
          console.log(res.body.tracks);
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artists: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        value={search}
        placeholder="search Songs/Artists"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Nav />
    </div>
  );
}
