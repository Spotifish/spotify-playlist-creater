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
    width: 100%;
    height: 100%;
  }

  html {
    font-size: 16px;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: $color-primary;
  }
</style>
