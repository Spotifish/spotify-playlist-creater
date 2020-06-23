import spotifyDao from "../spotifyDao";

const basePath = "/audio-features";

/**
 * Retrieves audio features for multiple spotify tracks
 * @param {Array<string>} ids array of track ids
 * @return {Promise<Object>} {@link https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/}
 */
async function getAudioFeatures(ids) {
  if (ids.length > 100) {
    throw new Error("Maximum number of tracks valid for analysis is 100!")
  }

  let queryParams = new URLSearchParams({
    ids: ids.join(",")
  });

  return spotifyDao(basePath + "?" + queryParams.toString(), {
    method: 'GET'
  })
}

export default {getAudioFeatures}
