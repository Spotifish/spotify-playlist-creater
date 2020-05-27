<template>
  <div id="playlist-creator">
    <DualHandleSlider :min="0" :max="50" v-model="x"></DualHandleSlider>
    <p>{{x}}</p>
  </div>
</template>

<script>
  import DualHandleSlider from "../components/DualHandleSlider";

  export default {
    name: "PlaylistCreator",
    data: function() {
      return {
        x: []
      }
    },
    components: {
      DualHandleSlider
    }
  }
</script>

<style scoped lang="scss">
  #playlist-creator {
    display: flex;
    flex-direction: column;
  }
</style>
