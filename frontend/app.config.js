const config = {
  spotifyApi: {
    // mode of the api, can be development, then requests will be directed to the spotify api, else a proxy server will be used, specified by the proxy base url
    mode: process.env.VUE_APP_SPOTIFY_API_MODE,
    modes: {
      DEV: "development",
      PROXY: "proxy"
    },
    // base url of the proxy
    baseUrl: process.env.VUE_APP_SPOTIFY_API_BASE_URL,
    // secrets for development purposes
    secrets: {
      clientId: process.env.VUE_APP_SPOTIFY_API_CLIENT_ID,
      clientSecret: process.env.VUE_APP_SPOTIFY_API_CLIENT_SECRET
    },
    forceDialog: false
  },
  baseUrl: process.env.BASE_URL
}

// validate the config
// validate root items
if (config.baseUrl === undefined) {
  console.error("No root url defined in config!")
}

// validate spotify api
const spotifyApi = config.spotifyApi;
if (!Object.values(spotifyApi.modes).includes(spotifyApi.mode)) {
  console.error("Invalid api mode in config!")
}

if (spotifyApi.mode === spotifyApi.modes.DEV) {
  if (spotifyApi.secrets.clientId === undefined) {
    console.error("No client id specified in dev mode!")
  }

  if (spotifyApi.secrets.clientSecret === undefined) {
    console.error("No client secret specified in dev mode!")
  }
}

if (process.env.VUE_APP_SPOTIFY_API_FORCE_DIALOG !== undefined) {
  spotifyApi.forceDialog = JSON.parse(process.env.VUE_APP_SPOTIFY_API_FORCE_DIALOG.toLowerCase());
}

export default config;
