<template>
  <div id="playlists">
    <PlaylistCard v-for="item in playlistItems" v-bind:key="item.id" :item="item"></PlaylistCard>
  </div>
</template>

<script>
  import repositories from "../../data/spotify/repositories";
  import PlaylistCard from "../../components/PlaylistCard";

  export default {
    name: "Playlists",
    components: {
      PlaylistCard
    },
    data: function () {
      return {
        playlistItems: []
      }
    },
    async created() {
      this.$store.commit("startLoading");
      const result = await repositories.playlistRepository.getCurrentUserPlaylists();
      this.$store.commit("finishLoading");
      this.playlistItems = result.items;
    }
  }
</script>

<style scoped lang="scss">
  #playlists {
    width: 100%;
    height: 100%;
    display: grid;
    padding: 1rem;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    overflow-y: scroll;

    @media (min-width: 1000px) {
      grid-template-columns: repeat(3, minmax(230px, 1fr))
    }

    div {
      min-height: 150px;
    }

    & > :last-child {
      margin-bottom: 1rem;
    }
  }
</style>
