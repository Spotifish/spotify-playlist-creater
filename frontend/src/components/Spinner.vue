<template>
  <div id="spinner"></div>
</template>

<script>
  export default {
    name: "Spinner"
  }
</script>

<style scoped lang="scss">
  #spinner, #spinner:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  #spinner {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: .7em solid rgba(255, 255, 255, 0.2);
    border-right: .7em solid rgba(255, 255, 255, 0.2);
    border-bottom: .7em solid rgba(255, 255, 255, 0.2);
    border-left: .7em solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 .95s infinite linear;
    animation: load8 .95s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
