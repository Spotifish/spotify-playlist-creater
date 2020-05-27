<template>
  <div id="playlist-card">
    <img v-bind:src="item.images[0].url" v-bind:alt="item.name">
    <span id="name">{{item.name}}</span>
    <span id="tracks">{{item.tracks.total}} tracks</span>
  </div>
</template>

<script>
  export default {
    name: "PlaylistCard",
    props: {
      'item': Object
    }
  }
</script>

<style scoped lang="scss">
  #playlist-card {
    width: calc(100% - #{($page-margin * 2)});
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr 1fr;
    background: white;
    margin: $page-margin $page-margin 0;
    padding: 10px;
    border-radius: $border-radius;
    @include box_shadow(2);

    &:last-child {
      margin-bottom: $page-margin;
    }

    img {
      width: 30vw;
      max-width: 400px;
      grid-column: 1 / 1;
      grid-row: 1 / 3;
      border-radius: $border-radius;
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
</style>
