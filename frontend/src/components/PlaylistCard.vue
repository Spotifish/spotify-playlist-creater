<template>
  <div id="playlist-card" v-bind:class="{ selected: isPlaylistSelected}" v-on:click="onItemSelected(item)">
    <div v-bind:style="{ backgroundImage: 'url(' + item.images[0].url + ')' }"></div>
    <span id="name">{{item.name}}</span>
    <span id="tracks">{{item.tracks.total}} tracks</span>
    <button v-on:click.stop="onItemSelected(item)" v-ripple>{{isPlaylistSelected ? "Selected" : "Select"}}</button>
  </div>
</template>

<script>
  export default {
    name: "PlaylistCard",
    props: {
      'item': Object
    },
    methods: {
      onItemSelected: function (item) {
        this.$store.dispatch("changeSelectPlaylistState", item);
      }
    },
    computed: {
      isPlaylistSelected: function () {
        return this.$store.getters.isPlaylistSelected(this.item.id)
      }
    }
  }
</script>

<style scoped lang="scss">
  #playlist-card {
    width: 100%;
    height: 100%;
    background: white;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr min-content;
    border-radius: $border-radius;
    @include box_shadow(2);

    &.selected {
      background-color: $color-primary-light;
    }

    button {
      @include ripple-button($color-primary-dark);
      text-align: center;
      border-radius: 0 0 $border-radius $border-radius;
      grid-row: 3 / 4;
      grid-column: span 2;
      width: 100%;
      height: 100%;
    }

    div {
      height: 100%;
      width: 100%;
      grid-column: 1 / 2;
      grid-row: 1 / 3;
      border-radius: $border-radius 0 0 0;
      background-size: cover;
    }

    $text-size-span: 1.1rem;

    span {
      width: 100%;
      text-align: center;
      font-size: $text-size-span;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: auto;
    }

    span#name {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    span#tracks {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }
  }
</style>
