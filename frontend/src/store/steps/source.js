import Vue from "vue";

export default {
  state: {
    selectedPlaylists: {}
  },
  mutations: {
    changeSelectPlaylistState(state, playlist) {
      if (state.selectedPlaylists[playlist.id] !== undefined) {
        Vue.delete(state.selectedPlaylists, playlist.id)
      } else {
        Vue.set(state.selectedPlaylists, playlist.id, playlist)
      }
    }
  },
  getters: {
    getSelectedPlaylists: state => state.selectedPlaylists,
    isPlaylistSelected: state => id => state.selectedPlaylists[id] !== undefined,
    isAnyPlaylistSelected: state => Object.values(state.selectedPlaylists).length > 0
  },
  actions: {
    changeSelectPlaylistState({commit, getters}, playlist) {
      commit("changeSelectPlaylistState", playlist)
      if (!getters.isAnalysisEmpty) {
        commit("clearAnalysis")
      }
    }
  }
}
