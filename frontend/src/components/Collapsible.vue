<template>
  <div id="collapsible" v-on:click="isCollapsed = !isCollapsed">
    <div id="bar" v-ripple>
      <span>{{title}}</span>
      <em v-if="isCollapsed" class="material-icons">expand_more</em>
      <em v-else class="material-icons">expand_less</em>
    </div>
    <div id="content" v-show-slide="!isCollapsed">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Collapsible",
    data: function () {
      return {
        isCollapsed: true
      }
    },
    props: ['title']
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
  }
</style>
