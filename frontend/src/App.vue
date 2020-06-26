<template>
  <div id="app">
    <div id="progress-bar"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  @import "static/sanitize.css";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }

  * {
    color: $color-text;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;

    &:before, &:after {
      box-sizing: inherit;
    }
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  button {
    @include ripple-button($color-accent)
  }
</style>
