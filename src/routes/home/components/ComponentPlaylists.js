import { useState, useEffect } from "react";

export default function ComponentPlaylsits({
  spotifyApi,
  playlists,
  accessToken,
}) {
  useEffect(() => {
    console.log(playlists);
    playlists.map((item) => {
      console.log(item.id);
      spotifyApi.getPlaylist(item.id).then(
        function (data) {
          console.log("Some information about this playlist", data.body);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    });
  }, []);

  console.log(playlists);
  return <div>test</div>;
}
