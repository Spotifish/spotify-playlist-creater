<template>
  <div id="workflow-container">
    <div id="progress">stepper progress bar</div>
    <div id="router-container">
      <router-view></router-view>
    </div>
    <div id="menu">
      <em class="material-icons" v-on:click="workflowMoveSteps(-1)" v-bind:class="{ enabled : isBackAllowed }">arrow_back</em>
      <em class="material-icons" v-on:click="workflowMoveSteps(1)" v-bind:class="{ enabled : isForwardAllowed }">arrow_forward</em>
    </div>
  </div>
</template>

<script>
  import {STEP_NAMES} from "../store/steps"

  export default {
    name: "WorkflowContainer",
    computed: {
      isBackAllowed: function () {
        return STEP_NAMES.indexOf(this.$store.state.route.name) > 0;
      },
      isForwardAllowed: function () {
        let stepName = this.$store.state.route.name;
        let hasNextStep = STEP_NAMES.indexOf(stepName) < STEP_NAMES.length - 1;
        let isCurrentStepValid = this.$store.getters.isStepValid(stepName);
        return hasNextStep && isCurrentStepValid
      }
    },
    methods: {
      /**
       * Moves the workflow n steps forwards for positive numbers and backwards for negative numbers
       * @param n
       */
      workflowMoveSteps: function (n) {
        if (n > 0 && !this.isForwardAllowed) return;
        if (n < 0 && !this.isBackAllowed) return;

        let currentN = STEP_NAMES.indexOf(this.$router.currentRoute.name);
        let nextN = Math.max(0, Math.min(STEP_NAMES.length - 1, currentN + n));

        if (nextN !== currentN) {
          this.$router.push({name: STEP_NAMES[nextN]});
        }
      }
    }
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
      flex-grow: 1;
      height: 0;
    }

    #menu {
      width: 100%;
      background-color: $color-primary;
      display: flex;
      flex-direction: row;
      align-items: center;
      @include box_shadow(2);

      .enabled {
        @include ripple($color-primary);
        color: white;
      }

      em {
        width: 50%;
        text-align: center;
        padding: 0.5rem 0;
        font-size: 1.8rem;
        color: $color-primary-dark;
      }
    }
  }
</style>
