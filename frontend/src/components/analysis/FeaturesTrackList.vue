<template>
  <div id="features-list">
    <div id="item" v-for="item in list" :key="item.name">
      <span id="track-name">{{item.name}}</span>
      <span id="feature-value">{{item.value}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FeaturesTrackList",
    props: {
      trackFeatures: Array,
      feature: {
        type: String,
        required: true
      }
    },
    computed: {
      list: function () {
        return this.trackFeatures
          .map(o => {
            return {
              name: o.track.track.name,
              value: o.features[this.feature]
            }
          })
        .sort((a, b) => b.value - a.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  #features-list {
    #item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 16px;
      border-bottom: $color-divider solid 1px;

      #track-name {
        flex-grow: 1;
        font-size: 0.95rem;
      }

      #feature-value {
        font-family: monospace;
        text-align: end;
        min-width: 8ch;
        width: 8ch;
      }
    }
  }
</style>
