<template>
  <div id="features-list">
    <table>
      <colgroup>
        <col span="1">
        <col span="1">
      </colgroup>

      <thead>
      <tr>
        <th>Track</th>
        <th id="select">
          <Multiselect
            v-model="selectedFeature"
            :options="features"
            :show-labels="false"
            :searchable="false"
            :allow-empty="false">
          </Multiselect>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in list" :key="item.name">
        <td id="track-name">{{ item.name }}</td>
        <td id="feature-value">{{ item.value.toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Multiselect from "vue-multiselect"

  export default {
    name: "FeaturesTrackList",
    components: {
      Multiselect
    },
    data: function () {
      return {
        features: [
          "acousticness",
          "danceability",
          "energy",
          "instrumentalness",
          "liveness",
          "loudness",
          "speechiness",
          "valence",
          "tempo"
        ],
        selectedFeature: "speechiness"
      }
    },
    computed: {
      ...mapGetters([
        "getAudioFeatures",
        "getTracks"
      ]),
      trackFeatures: function () {
        if (this.getTracks.length === this.getAudioFeatures.length) {
          return this.getTracks.map((track, index) => {
            return {
              track,
              features: this.getAudioFeatures[index]
            }
          })
        } else {
          return []
        }
      },
      list: function () {
        let existingNames = [];

        return this.trackFeatures
          .map(o => {
            return {
              name: o.track.track.name,
              value: o.features[this.selectedFeature]
            }
          })
          .filter(o => {
            const hasElement = existingNames.includes(o.name);
            if (!hasElement) {
              existingNames.push(o.name);
              return true;
            } else {
              return false;
            }
          })
          .sort((a, b) => b.value - a.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  #features-list {
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    tr {
      &:nth-of-type(odd) {
        background: $color-primary-light;
      }

      td:nth-of-type(2) {
        border-left: 1px solid $color-divider;
      }
    }

    th {
      background: $color-primary-dark;
      color: white;
      font-weight: bold;
      white-space: nowrap;
    }

    td, th {
      padding: 6px;
      text-align: left;
    }

    col:nth-of-type(2) {
      width: 30%;
    }

    &::v-deep .multiselect {
      overflow: visible;

      .multiselect__single {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .multiselect__content {
        position: relative;
        overflow: auto;
      }

      .multiselect__option--selected {
        background: $color-accent;
        color: white;
      }

      .multiselect__option--highlight {
        background: $color-primary-light;
        color: black;
      }
    }
  }
</style>
