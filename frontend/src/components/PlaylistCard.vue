<template>
  <div id="playlist-card" v-bind:class="{ selected: isPlaylistSelected}" v-on:click="onItemSelected(item)">
    <img v-bind:src="item.images[0].url" v-bind:alt="item.name">
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
        this.$store.commit("changeSelectPlaylistState", item);
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
    background: white;
    width: calc(100% - #{($page-margin * 2)});
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 3fr;
    margin: $page-margin $page-margin 0;
    border-radius: $border-radius;
    @include box_shadow(2);

    &.selected {
      background-color: $color-primary-light;
    }

    &:last-child {
      margin-bottom: $page-margin;
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

    img {
      height: 8rem;
      grid-column: 1 / 1;
      grid-row: 1 / 3;
      border-radius: $border-radius $border-radius 0 0;
    }

    $tex-size-span: 1.2rem;

    span {
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
</style>
