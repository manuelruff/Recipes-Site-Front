<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <draggable v-model="recipes" @end="updateOrder" tag="b-row">
      <b-col v-for="(r, index) in recipes" :key="r.id" cols="4">
        <RecipePreviewBonus class="recipePreview" :recipe="r" :index="index" @remove-recipe="removeRecipe" />
      </b-col>
    </draggable>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable';
import RecipePreviewBonus from "./RecipePreviewBonus.vue";

export default {
  name: "RecipePreviewListBonus",
  components: {
    draggable,
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
  methods: {
    removeRecipe(recipeId) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
      console.log('Recipe removed, new length:', this.recipes.length); // Debug statement
      this.$emit('update-meal-count', this.recipes.length); // Emit event with the updated count
    },
    updateOrder() {
      console.log("Order updated", this.recipes);
    }
  },
  mounted() {
    console.log('Component mounted, initial recipes length:', this.recipes.length); // Debug statement
    this.$emit('update-meal-count', this.recipes.length); // Emit initial meal count
  }
};
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

/* existing styles... */
</style>
