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
    getAudioFeatures: state => {
      if (state.audioFeatures !== undefined && state.audioFeatures['audio_features'] !== undefined) {
        return state.audioFeatures['audio_features'];
      } else {
        return [];
      }
    },
    getTracks: state => {
      if (state.tracks === undefined) return [];
      return state.tracks.flatMap(result => result.items)
    },
    /**
     * Returns the features of the tracks in an object mapping feature to value.
     */
    getAverageFeatures: (state, getters) => {
      const features = [
        'acousticness',
        'danceability',
        'energy',
        'instrumentalness',
        'liveness',
        'loudness',
        'speechiness',
        'tempo',
        'valence'
      ];

      if (getters.getAudioFeatures.length === 0) {
        return {};
      }

      // reduce to sum
      const sumFeatures = getters.getAudioFeatures.reduce((a, b) => {
        const mainFeatures = Object.fromEntries(Object.entries(a).filter(([key]) => features.includes(key)))
        const bFeatures = Object.fromEntries(Object.entries(b).filter(([key]) => features.includes(key)))

        Object.keys(mainFeatures).forEach(key => {
          mainFeatures[key] += bFeatures[key]
        });

        return mainFeatures;
      })

      // average
      Object.keys(sumFeatures).forEach(key => sumFeatures[key] /= getters.getAudioFeatures.length);

      return sumFeatures;
    }
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
