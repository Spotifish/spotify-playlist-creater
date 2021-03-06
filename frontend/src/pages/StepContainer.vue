<template>
  <div id="workflow-container">
    <div id="header">
      <h1>Spoti.fish</h1>
    </div>
    <ProgressIndefinite :is-active="isLoading"></ProgressIndefinite>
    <div id="router-container" v-bind:style="{ visibility: isLoading ? 'hidden' : 'visible' }">
      <router-view></router-view>
    </div>
    <div id="menu">
      <em class="material-icons" v-on:click="workflowMoveSteps(-1)" v-bind:class="{ enabled : isBackAllowed }" v-ripple>arrow_back</em>
      <em class="material-icons" v-on:click="workflowMoveSteps(1)" v-bind:class="{ enabled : isForwardAllowed }" v-ripple>arrow_forward</em>
    </div>
  </div>
</template>

<script>
  import {STEP_NAMES} from "@/store/steps"
  import ProgressIndefinite from "@/components/ProgressIndefinite";
  import {mapGetters} from "vuex";

  export default {
    name: "WorkflowContainer",
    components: {
      ProgressIndefinite
    },
    computed: {
      ...mapGetters([
        "isLoading"
      ]),
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

    #header {
      @include box_shadow(2);
      width: 100%;
      background: $color-primary;

      h1 {
        color: white;
        width: 100%;
        text-align: center;
        margin: .6rem 0;
      }
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
