<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    inject: {
      dao: 'dao'
    }
  }
</script>

<style lang="scss">
  @import "static/sanitize.css";

  html, body, #app {
    width: 100vw;
    height: 100vh;
  }

  html {
    font-size: 16px;
  }

  * {
    color: white;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  .ripple {
    background-position: center;
    transition: background 0.8s;
  }
  .ripple:hover {
    background: lighten($color-accent, 7%) radial-gradient(circle, transparent 1%, lighten($color-accent, 7%) 1%) center/15000%;
  }
  .ripple:active {
    background-color: lighten($color-accent, 20%);
    background-size: 100%;
    transition: background 0s;
  }

  button {
    border: none;
    font-size: 16px;
    cursor: pointer;
    background-color: $color-accent;
    box-shadow: 0 0 4px #999;
    outline: none;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: $color-primary;
  }
</style>
