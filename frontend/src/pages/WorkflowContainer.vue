<template>
  <div id="workflow-container">
    <div id="progress">stepper progress bar</div>
    <div id="router-container">
      <router-view></router-view>
    </div>
    <div id="menu">
      <em class="material-icons">arrow_back</em>
      <em class="material-icons">arrow_forward</em>
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

    #menu {
      width: 100%;
      background-color: $color-primary;
      display: flex;
      flex-direction: row;
      align-items: center;
      @include box_shadow(2);

      em {
        color: white;
        width: 50%;
        text-align: center;
        padding: 0.5rem 0;
        @include ripple($color-primary);
        font-size: 1.8rem;
      }
    }
  }
</style>
