<template>
  <div id="analysis">
    <Collapsible title="Trend" v-for="n in 20" v-bind:key="n">
      <h1>Hallo {{n}}</h1>
    </Collapsible>
  </div>
</template>

<script>
  import Collapsible from "../../components/Collapsible";

  export default {
    name: "Analysis",
    components: {
      Collapsible
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
