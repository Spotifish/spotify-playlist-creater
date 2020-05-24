import config from "../../../app.config";
import store from "../../store"

/**
 * Wraps a request with the required authentication for the spotify api
 * @param {string} url relative endpoint url
 * @param {RequestInit} params additional params for fetch
 * @return {Promise<Object>} resolves when a response has been received
 */
export default async (url, params) => {
  params.headers['Authorization'] = "Bearer " + store.getters.spotifyAccessToken;
  const response = await fetch(config.spotifyApi.baseUrl + url, params)
  if (response.status === 401) {
    store.commit("invalidateSpotifyAccessToken");

    // TODO crude approach, should be using router instead.
    window.location.href = '/';
  } else if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error while accessing spotify api: " + response.status)
  }
};
