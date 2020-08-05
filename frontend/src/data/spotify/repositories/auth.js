import config from "../../../../app.config";
import {base64UrlEncode, generateRandomString, hashSha256} from "@/util/crypto";

const CODE_VERIFIER_KEY = "code_verifier";

/**
 * Opens a new window in which the user authorizes against the spotify api. Saves the code verifier statically to localstorage which is automatically used on calling {@link requestAccessToken}.
 * @param {string} redirectUrl the user will be redirected here after authenticating
 * @param {string} state current state
 * @param {string} [scope] space separated list of scopes, see spotify api docs
 */
async function requestAuthorizationToken(redirectUrl, state, scope) {
  // max length in string is 128, therefore use 64 bytes, each byte represented as a hex string
  const codeVerifier = generateRandomString();
  const codeChallenge = await hashSha256(codeVerifier);

  const query = new URLSearchParams({
    client_id: config.spotifyApi.secrets.clientId,
    response_type: "code",
    redirect_uri: redirectUrl,
    code_challenge_method: "S256",
    code_challenge: base64UrlEncode(codeChallenge),
    state
  });

  if (scope !== undefined) {
    query.set('scope', scope);
  }

  window.localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

  location.href = 'https://accounts.spotify.com/authorize?' + query.toString();
}

/**
 * Trades an authorization token for an access and refresh token with an expiration date
 * @param {string} redirectUrl original redirect url, has to be the same as in {@link requestAuthorizationToken}
 * @param {string} code authorization code
 */
async function requestAccessToken(redirectUrl, code) {
  const codeVerifier = window.localStorage.getItem(CODE_VERIFIER_KEY);
  if (codeVerifier === null) {
    throw new Error("Verifier is undefined! Must call requestAuthorizationToken before!")
  }

  const data = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUrl,
    code_verifier: codeVerifier
  });

  data.set('client_id', config.spotifyApi.secrets.clientId);

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
    throw new Error(`${response.status} in requestAccessToken!`);
  }
}

export default {requestAccessToken, requestAuthorizationToken}
