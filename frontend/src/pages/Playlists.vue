<template>
  <div id="playlists">
    <ul>
      <li v-for="item in playlistItems" v-bind:key="item.id">
        <img v-bind:src="item.images[0].url" v-bind:alt="item.name">
        <span id="name">{{item.name}}</span>
        <span id="tracks">{{item.tracks.total}} tracks</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import repositories from "../data/spotify/repositories";

  export default {
    name: "Playlists",
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

      li {
        width: calc(100% - #{($page-margin * 2)});
        display: grid;
        align-items: center;
        justify-content: center;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 1fr 1fr;
        background: white;
        margin: $page-margin $page-margin 0;
        padding: 10px;
        border-radius: 15px;
        @include box_shadow(2);

        &:last-child {
          margin-bottom: $page-margin;
        }

        img {
          width: 30vw;
          max-width: 400px;
          grid-column: 1 / 1;
          grid-row: 1 / 3;
        }

        $tex-size-span: 1.2rem;

        span {
          color: black;
          height: auto;
          text-align: center;
          font-size: $tex-size-span;
          line-height: ($tex-size-span + 0.05rem);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        span#name {
          grid-column: 2 / 2;
          grid-row: 1 / 1;
        }

        span#tracks {
          grid-column: 2 / 2;
          grid-row: 2 / 2;
        }
      }

    }
  }
</style>
