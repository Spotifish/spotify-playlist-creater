import analysis from "../../data/spotify/repositories/analysis";
import playlist from "../../data/spotify/repositories/playlist";

export default {
  state: {
    tracks: undefined,
    audioFeatures: undefined
  },
  mutations: {
    setAudioFeatures(state, audioFeatures) {
      state.audioFeatures = audioFeatures
    },
    setTracks(state, tracks) {
      state.tracks = tracks
    },
    clearAnalysis(state) {
      state.tracks = undefined;
      state.audioFeatures = undefined;
    }
  },
  getters: {
    isAnalysisEmpty: state => state.tracks === undefined && state.audioFeatures === undefined,
    getAudioFeatures: state => state.audioFeatures,
    getTracks: state => state.tracks.flatMap(result => result.items)
  },
  actions: {
    async loadAudioFeatures({commit, state, getters, dispatch}) {
      if (state.tracks === undefined) {
        await dispatch("loadTracks");
      }

      let result = await analysis.getAudioFeatures(getters.getTracks.map(track => track.track.id));
      commit("setAudioFeatures", result);
    },
    async loadTracks({commit, getters}) {
      if (!getters.isAnyPlaylistSelected) return;

      let promises = [];
      Object.keys(getters.getSelectedPlaylists).forEach(playlistId => {
        promises.push(playlist.getTracksOfPlaylist(playlistId));
      });

      let tracks = await Promise.all(promises);
      commit("setTracks", tracks);
    }
  }
}
