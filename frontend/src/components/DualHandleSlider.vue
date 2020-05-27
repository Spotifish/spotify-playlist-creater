<template>
  <div id="wrapper">
    <div v-bind:id="uniqueId"></div>
  </div>
</template>

<script>
  import noUiSlider from 'nouislider';
  import 'nouislider/distribute/nouislider.css';

  export default {
    name: "DualHandleSlider",
    props: {
      'value': Array,
      'min': Number,
      'max': Number
    },
    mounted() {
      const slider = noUiSlider.create(document.getElementById(this.uniqueId), {
        start: [this.min, this.max],
        connect: true,
        tooltips: [
          true,
          true
        ],
        step: 1,
        range: {
          'min': 0,
          'max': 50
        }
      });

      // eslint-disable-next-line no-unused-vars
      slider.on('set', (values, handle, unencoded, tap, positions, noUiSlider) => {
        this.$emit('input', values.map(x => Number(x)));
      })
    },
    computed: {
      uniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9)
      }
    }
  }
</script>

<style lang="scss">
  #wrapper {
    padding: 3.2rem 35px 0;
  }

  .noUi-connect {
    background: $color-accent;
  }

  .noUi-tooltip {
    @include box_shadow(1);
  }

  .noUi-handle {
    border-radius: 50%;
    border: none;
    width: 28px !important;
    @include box_shadow(1);
    transition: background-color .2s ease-in-out;

    &:focus {
      outline: 0 !important;
      background: lighten($color-accent, 30);
    }

    &:before, &:after {
      background: transparent;
    }
  }
</style>
