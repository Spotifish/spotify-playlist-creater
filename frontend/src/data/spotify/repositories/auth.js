import config from "../../../../app.config";

/**
 * Opens a new window in which the user authorizes against the spotify api.
 * @param {string} redirectUrl the user will be redirected here after authenticating
 * @param {string} state current state
 * @param {string} [scope] space separated list of scopes, see spotify api docs
 */
function requestAuthorizationToken(redirectUrl, state, scope) {
  const query = new URLSearchParams({
    client_id: config.spotifyApi.secrets.clientId,
    response_type: "code",
    redirect_uri: redirectUrl,
    state
  });

  if (scope !== undefined) {
    query.set('scope', scope);
  }

  location.href = 'https://accounts.spotify.com/authorize?' + query.toString();
}

/**
 * Trades an authorization token for an access and refresh token with an expiration date
 * @param {string} redirectUrl original redirect url, has to be the same as in {@link requestAuthorizationToken}
 * @param {string} code authorization code
 */
async function requestAccessToken(redirectUrl, code) {
  const data = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUrl
  });

  if (config.spotifyApi.secrets.clientSecret != null) {
    data.set('client_id', config.spotifyApi.secrets.clientId);
    data.set('client_secret', config.spotifyApi.secrets.clientSecret);

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return {
        expirationDate: new Date().getTime() + data.expires_in * 1000,
        accessToken: data.access_token,
        refreshToken: data.refresh_token
      }
    } else {
      throw new Error(response.status + " in requestAccessToken!");
    }


  } else {
    // TODO do this on the server to not expose the client secret
    throw new Error("Server-side authentication not implemented yet!")
  }
}

export default {requestAccessToken, requestAuthorizationToken}
