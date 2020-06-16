<template>
  <div id="workflow-container">
    <div id="progress">stepper progress bar</div>
    <div id="router-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WorkflowContainer"
  }
</script>

<style scoped lang="scss">
  #workflow-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    #progress {
      @include box_shadow(2);
      height: 6rem;
      width: 100%;
      background: $color-primary;
      z-index: 1;
    }

    #router-container {
      width: 100%;
      height: calc(100% - 6rem);
    }
  }
</style>
