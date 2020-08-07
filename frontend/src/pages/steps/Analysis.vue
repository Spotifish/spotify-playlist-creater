<template>
  <div id="container">
    <div id="analysis">
      <Collapsible title="Average Features" :collapsed="true">
        <features :features="features"></features>
      </Collapsible>
      <Collapsible title="Features by Track">
        <features-track-list feature="valence"/>
      </Collapsible>
    </div>
  </div>
</template>

<script>
  import Collapsible from "@/components/Collapsible";
  import Features from "@/components/analysis/Features";
  import FeaturesTrackList from "@/components/analysis/FeaturesTrackList";

  import {STEP_NAMES} from "@/store/steps";
  import {mapGetters} from "vuex"

  export default {
    name: "Analysis",
    components: {
      Collapsible,
      Features,
      FeaturesTrackList
    },
    computed: {
      ...mapGetters([
        "getAverageFeatures",
        "isAnyPlaylistSelected"
      ]),
      features: function () {
        const removeFeatures = ["loudness", "tempo"];
        return Object.fromEntries(Object.entries(this.getAverageFeatures)
          .filter(([key]) => !removeFeatures.includes(key))
          .map(([key, value]) => [key.charAt(0).toUpperCase() + key.slice(1), value])
        );
      }
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
  #container {
    width: 100%;
    height: 100%;
    padding: 0 $page-margin;
    overflow-y: scroll;
    display: grid;
    place-items: start center;
  }

  #analysis {
    height: 100%;
    width: 100%;
    max-width: 1000px;

    &:first-child {
      padding-top: $page-margin;
    }

    &:last-child {
      padding-bottom: $page-margin;
    }

    & > div {
      padding-bottom: $page-margin / 2;
    }
  }
</style>
