function playPause(arg) {
  if (!currentlyPlayingName) return;
  return arg === "play"
    ? setPlaying(true)
    : arg === "pause"
    ? setPlaying(false)
    : null;
}

function skipSong(arg) {
  return arg === "next"
    ? (setChosenTrack(chosenPlaylist[chosenIndex + 1].track.uri),
      setChosenIndex(chosenIndex + 1),
      setCurrentlyPlayingName(
        chosenPlaylist[chosenIndex + 1].track.name +
          " - " +
          chosenPlaylist[chosenIndex + 1].track.artists[0].name
      ))
    : arg === "prev"
    ? (setChosenTrack(chosenPlaylist[chosenIndex - 1].track.uri),
      setChosenIndex(chosenIndex - 1),
      setCurrentlyPlayingName(
        chosenPlaylist[chosenIndex - 1].track.name +
          " - " +
          chosenPlaylist[chosenIndex - 1].track.artists[0].name
      ))
    : null;
}

export { playPause, skipSong };
