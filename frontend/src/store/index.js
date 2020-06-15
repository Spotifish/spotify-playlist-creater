import Vue from "vue";
import Vuex from 'vuex'
import config from "../../app.config";

Vue.use(Vuex);

const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken';
const SPOTIFY_TOKEN_EXPIRY = 'spotifyTokenExpiry';

export default new Vuex.Store({
  state: {
    spotifyAccessToken: localStorage.getItem(SPOTIFY_ACCESS_TOKEN),
    spotifyTokenExpiration: localStorage.getItem(SPOTIFY_TOKEN_EXPIRY),
    isLoading: false,

    // playlists mapped by id
    selectedPlaylists: {}
  },
  mutations: {
    setSpotifyAccessToken(state, auth) {
      if (config.spotifyApi.isSaveTokensEnabled) {
        localStorage.setItem(SPOTIFY_ACCESS_TOKEN, auth.accessToken);
        localStorage.setItem(SPOTIFY_TOKEN_EXPIRY, auth.expirationDate);
      }

      state.spotifyAccessToken = auth.accessToken;
      state.spotifyTokenExpiration = auth.expirationDate;
    },
    invalidateSpotifyAccessToken(state) {
      localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);
      localStorage.removeItem(SPOTIFY_TOKEN_EXPIRY);

      state.spotifyAccessToken = null;
      state.spotifyTokenExpiration = null;
    },
    startLoading(state) {
      state.isLoading = true
    },
    finishLoading(state) {
      state.isLoading = false
    },
    changeSelectPlaylistState(state, playlist) {
      if (state.selectedPlaylists[playlist.id] !== undefined) {
        Vue.delete(state.selectedPlaylists, playlist.id)
      } else {
        Vue.set(state.selectedPlaylists, playlist.id, playlist)
      }
    }
  },
  actions: {
  },
  getters: {
    spotifyAccessToken: state => state.spotifyAccessToken,
    spotifyTokenExpiry: state => state.spotifyTokenExpiration,
    isAuthenticated: state => state.spotifyAccessToken != null && state.spotifyTokenExpiration > new Date().getTime(),
    isLoading: state => state.isLoading,
    getSelectedPlaylists: state => state.selectedPlaylists,
    isPlaylistSelected: state => id => state.selectedPlaylists[id] !== undefined
  }
});
