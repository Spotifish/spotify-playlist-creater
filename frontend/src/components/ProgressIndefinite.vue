<template>
  <div class="slider" v-bind:class="{ active: isActive }">
    <div></div>
  </div>
</template>

<script>
  export default {
    name: "ProgressIndefinite",
    props: {
      isActive: Boolean
    }
  }
</script>

<style scoped lang="scss">
  .slider {
    height: 5px;
    width: 100%;
    position: relative;
    margin-top: -5px;
    transition: margin-top .1s ease-in-out;
    z-index: -1;

    &.active {
      margin-top: 0;

      div {
        animation: slide 1.5s ease-in-out infinite;
        animation-delay: .1s;
        top: 0;
      }
    }

    div {
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      width: 30%;
      background: $color-accent;
    }
  }

  @keyframes slide {
    0% {
      left: 0;
    }
    50% {
      left: calc(100% - 30%);
    }
    100% {
      left: 0;
    }
  }

  @keyframes decrease {
    from {
      left: -80%;
      width: 80%;
    }
    to {
      left: 110%;
      width: 10%;
    }
  }
</style>
