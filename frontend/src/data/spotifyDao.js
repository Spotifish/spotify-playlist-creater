import config from "../../app.config";

const extendedFetch = (url, params) => fetch(config.spotifyApi.baseUrl + url, params);

/**
 * Opens a new window in which the user authorizes against the spotify api.
 * @param {string} redirectUrl the user will be redirected here after authenticating
 * @param {string} state current state
 * @param {string} [scope] space separated list of scopes, see spotify api docs
 */
function requestAuthorization(redirectUrl, state, scope) {
  const query = new URLSearchParams({
    client_id: config.spotifyApi.secrets.clientId,
    response_type: "code",
    redirect_uri: redirectUrl,
    state
  });

  if (scope !== undefined) {
    query.set('scope', scope);
  }

  window.open('https://accounts.spotify.com/authorize?' + query.toString(), '_blank');
}

/**
 * Checks if the app is authenticated, if its not calls {@link requestAuthorization} then redirects back to the current site.
 * @return {Promise<void>}
 * @param {string} state
 */
async function authenticationHandler(state) {
  await requestAuthorization(config.baseUrl + "/authCallback", state);
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
