<template>
    <b-container>
      <h3>
        {{ title }}:
        <slot></slot>
      </h3>
      <b-row>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreviewBonus class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import RecipePreviewBonus from "./RecipePreviewBonus.vue";
  
  export default {
    name: "RecipePreviewListBonus",
    components: {
        RecipePreviewBonus
    },
    props: {
      title: {
        type: String,
        required: true
      },
      recipes: {
        type: Array,
        required: true,
        default: () => []
      },
      randomize: {
        type: Boolean,
        default: false
      }
    },
  };
  </script>