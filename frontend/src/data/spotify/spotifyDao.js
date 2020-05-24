import config from "../../../app.config";

const extendedFetch = (url, params) => fetch(config.spotifyApi.baseUrl + url, params);

/**
 * Checks if the app is authenticated, if its not calls {@link requestAuthorizationToken} then redirects back to the current site.
 * @return {Promise<void>}
 * @param {string} state
 */
// eslint-disable-next-line no-unused-vars
async function authenticationHandler(state) {
}

/**
 * Wraps a request with the required authentication for the spotify api
 * @param {string} url relative endpoint url
 * @param {Object} params additional params for fetch
 * @return {Promise<Response>} resolves when a response has been received
 */
export default async (url, params) => {
  await authenticationHandler("/");
  return extendedFetch(url, params);
};
