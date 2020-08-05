const config = {
  spotifyApi: {
    baseUrl: "https://api.spotify.com/v1",
    secrets: {
      clientId: process.env.VUE_APP_SPOTIFY_API_CLIENT_ID
    },
    isSaveTokensEnabled: process.env.VUE_APP_SPOTIFY_API_SAVE_TOKENS && process.env.VUE_APP_SPOTIFY_API_SAVE_TOKENS.toLowerCase() === 'true'
  }
}

// validate the config
// validate root items

// validate spotify api
const spotifyApi = config.spotifyApi;

if (spotifyApi.secrets.clientId === undefined) {
  throw new Error("No client id defined in the config!")
}

export default config;
