<template>
  <div id="playlists">
    <ul>
      <PlaylistCard v-for="item in playlistItems" v-bind:key="item.id" :item="item"></PlaylistCard>
    </ul>
  </div>
</template>

<script>
  import repositories from "../data/spotify/repositories";
  import PlaylistCard from "../components/PlaylistCard";

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

    ul {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
    }
  }
</style>
