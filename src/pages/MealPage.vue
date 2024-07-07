<template>
  <div class="container">
    <div class="row">
      <RecipePreviewListBonus
        ref="recipeList"
        title="My Meal"
        :displayCount="8"
        class="RandomRecipes center"
        :recipes="recipes"
      />
    </div>
    <div class="row justify-content-center mt-3">
      <button v-if="recipes.length" @click="clearRecipes" class="btn btn-danger">Clear All Recipes</button>
    </div>
  </div>
</template>

<script>
import RecipePreviewListBonus from "../components/RecipePreviewListBonus";
import { mockGetMealRecipesPreview } from "../services/recipes.js";
import { getMeals,DeleteMeal } from "../services/user.js";

export default {
  name: "FamilyRecipesPage",
  components: {
    RecipePreviewListBonus,
  },
  data() {
    return {
      recipes: [],
      lastViewedRecipes: [],
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      try {
        // const response = mockGetMealRecipesPreview();
        const response = await getMeals();
        this.recipes = response.data.recipes;
      } catch (error) {
        console.log(error);
      }
    },
    clearRecipes() {
      DeleteMeal();
      this.recipes = [];
      // Reset the meal count in sessionStorage to 0
      sessionStorage.setItem('mealsPrepared', 0);
      // Emit event to update meal count
      this.$root.$emit('update-meal-count', 0);
    },
  },
};
</script>

<style scoped>
.btn {
  margin-top: -40px; /* Adjust this value to move the button closer to the RecipePreviewListBonus component */
}
</style>