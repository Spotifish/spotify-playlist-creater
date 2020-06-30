<template>
  <div id="analysis">
    <Collapsible title="Features">
      <features :features="$store.getters.getAverageFeatures"></features>
    </Collapsible>
  </div>
</template>

<script>
  import Collapsible from "../../components/Collapsible";
  import Features from "../../components/charts/Features";
  import {STEP_NAMES} from "../../store/steps";

  export default {
    name: "Analysis",
    components: {
      Collapsible,
      Features
    },
    beforeCreate() {
      // if no playlist selected, go a step back
      if (!this.$store.getters.isAnyPlaylistSelected) {
        this.$router.push({name: STEP_NAMES[0]})
      }
    }
  }
</script>

<style scoped lang="scss">
  #analysis {
    padding: 0 $page-margin;
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    &:first-child {
      padding-top: $page-margin;
    }

    &:last-child {
      padding-bottom: $page-margin;
    }

    div {
      padding-bottom: 5px;
    }
  }
</style>
