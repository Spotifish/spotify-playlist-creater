import spotifyDao from "../spotifyDao";

/**
 * Retrieves the currently authenticated users playlists
 * @param {number} limit how many playlists to query maximum. <i>Valid: 1-50</i>
 * @param {number} offset offset for querying. <i>Valid: 0-100000</i>
 * @return {Promise<Object>} A spotify playlist object, {@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/|see here.}
 */
async function getCurrentUserPlaylists(limit=20, offset=0) {
  let queryParams = new URLSearchParams({
    limit,
    offset
  });

  return spotifyDao("/me/playlists" + "?" + queryParams.toString(), {
    method: 'GET'
  })
}

/**
 * Retrieves the tracks in a playlist
 * @param {string} playlistId
 * @param {number?} limit
 * @param {number?} offset
 * @return {Promise<Object>} {@link https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/}
 */
async function getTracksOfPlaylist(playlistId, limit=100, offset=0) {
  let queryParams = new URLSearchParams({
    limit,
    offset
  });

  return spotifyDao("/playlists/" + playlistId + "/tracks?" + queryParams.toString(), {
    method: 'GET'
  })
}

export default {getCurrentUserPlaylists, getTracksOfPlaylist}
