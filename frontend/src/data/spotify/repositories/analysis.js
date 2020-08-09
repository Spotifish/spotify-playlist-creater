import spotifyDao from "../spotifyDao";

const basePath = "/audio-features";

/**
 * Retrieves audio features for multiple spotify tracks
 * @param {Array<string>} ids array of track ids
 * @return {Promise<Object>} {@link https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/}
 */
async function getAudioFeatures(ids) {
  // the api can only return 100 features at a time
  let chunks = [];
  const chunkSize = 100;
  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize))
  }

  try {
    let results = await Promise.all(chunks.map(chunkIds => {
      let queryParams = new URLSearchParams({
        ids: chunkIds.join(",")
      });

      return spotifyDao(basePath + "?" + queryParams.toString(), {
        method: 'GET'
      });
    }));

    return results.reduce((prev, curr) => {
      prev['audio_features'] = Array.prototype.concat(prev['audio_features'], curr['audio_features']);
      return prev;
    });
  } catch (e) {
    throw Error(e);
  }
}

export default {getAudioFeatures}
