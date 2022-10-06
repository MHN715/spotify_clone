const getRecentTracks = (
  limit,
  offset,
  spotifyApi,
  setRecentTracks,
  setIsLoadingRecentTracks
) => {
  spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: limit,
      offset: offset,
    })
    .then(
      function (recentTracks) {
        console.log(recentTracks);
        setRecentTracks(recentTracks.body.items);

        setIsLoadingRecentTracks(false);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};

const getSavedTracks = (
  limit,
  offset,
  spotifyApi,
  setSavedTracks,
  setIsLoadingSavedTracks
) => {
  spotifyApi
    .getMySavedTracks({
      limit: limit,
      offset: offset,
    })
    .then(
      function (savedTracks) {
        console.log("savedtracks:", savedTracks);
        setSavedTracks(savedTracks.body.items);
        setIsLoadingSavedTracks(false);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};

const getFeaturedPlaylists = (
  limit,
  offset,
  spotifyApi,
  setFeaturedPlaylists,
  setIsLoadingFeaturedPlaylists
) => {
  spotifyApi
    .getFeaturedPlaylists({
      limit: limit,
      offset: offset,
    })
    .then(
      function (data) {
        setFeaturedPlaylists(data.body.playlists.items);

        setIsLoadingFeaturedPlaylists(false);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};

const getNewReleases = (
  limit,
  offset,
  spotifyApi,
  setNewReleases,
  setIsLoadingNewReleases
) => {
  spotifyApi.getNewReleases({ limit: limit, offset: offset }).then(
    function (data) {
      // console.log(data.body);
      setNewReleases(data.body.albums.items);

      setIsLoadingNewReleases(false);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};

export {
  getRecentTracks,
  getSavedTracks,
  getFeaturedPlaylists,
  getNewReleases,
};
