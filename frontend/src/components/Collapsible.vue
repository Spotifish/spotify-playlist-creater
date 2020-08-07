<template>
  <div id="collapsible">
    <div id="bar" v-ripple v-on:click="isCollapsed = !isCollapsed">
      <span>{{ title }}</span>
      <em v-if="isCollapsed" class="material-icons">expand_more</em>
      <em v-else class="material-icons">expand_less</em>
    </div>
    <div id="content"
         v-show-slide="!isCollapsed"
         :class="{ 'allow-overflow': allowOverflow }"
         @slide-open-start="slideOpenStart"
         @slide-open-end="slideOpenEnd"
         @slide-close-start="slideCloseStart"
         @slide-close-end="slideCloseEnd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Collapsible",
    data: function () {
      return {
        isCollapsed: undefined,
        allowOverflow: true
      }
    },
    created() {
      this.isCollapsed = this.collapsed
    },
    props: {
      "title": String,
      "collapsed": {
        type: Boolean,
        default: true
      }
    },
    methods: {
      slideOpenStart() {
        this.allowOverflow = false;
      },
      slideOpenEnd() {
        this.allowOverflow = true;
      },
      slideCloseStart() {
        this.allowOverflow = false;
      },
      slideCloseEnd() {
        this.allowOverflow = false;
      },
    }
  }
</script>

<style scoped lang="scss">
  #collapsible {
    width: 100%;

    #bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include box_shadow(1);
      width: 100%;
      border-radius: $border-radius $border-radius 0 0;
      padding: .5rem 1rem;

      span {
        text-align: center;
        flex-grow: 1;
      }

      em {
      }
    }

    #content {
      @include box_shadow(1);
    }

    .allow-overflow {
      overflow: visible !important;
    }
  }
</style>
