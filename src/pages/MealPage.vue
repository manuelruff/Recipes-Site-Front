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
        if(response.status == 200){
          this.recipes = response.data.recipes;
        }
        else {
          console.log("Error fetching recipes: ", response);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async clearRecipes() {
      const response = await DeleteMeal();
      if(response.status == 200){
        this.recipes.forEach(recipe => {
            // Clearing progress data for each recipe
            const completedStepsKey = `completedSteps_${recipe.id}`;
            const totalStepsKey = `totalSteps_${recipe.id}`;
            sessionStorage.removeItem(completedStepsKey);
            sessionStorage.removeItem(totalStepsKey);
        });
        this.recipes = []; // Clear the recipes array after data removal
        // Retrieve username from the root store
        const username = this.$root.store.username;
        // Build a unique sessionStorage key with the username for meals prepared
        const mealsKey = `${username}_mealsPrepared`;
        // Reset the meal count in sessionStorage to 0 for this specific user
        sessionStorage.setItem(mealsKey, 0);
        // Emit event to update meal count across components
        this.$root.$emit('update-meal-count', 0);
        console.log('All recipes and progress data cleared successfully.');
      }
      else {
        console.log("Error clearing recipes: ", response);
      }
      this.recipes = [];
    },
  },
};
</script>

<style scoped>
.btn {
  margin-top: -40px; /* Adjust this value to move the button closer to the RecipePreviewListBonus component */
}
</style>