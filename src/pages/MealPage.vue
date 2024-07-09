<template>
  <div class="container">
    <div class="row">
      <RecipePreviewListBonus
        ref="recipeList"
        title="My Meal"
        :displayCount="recipes.length"
        class="RandomRecipes center"
        :recipes="recipes"
      />
    </div>
    <div class="row justify-content-center mt-3">
      <button v-if="recipes.length" @click="clearRecipes" class="btn btn-danger clear-button">Clear All Recipes</button>
    </div>
  </div>
</template>

<script>
import RecipePreviewListBonus from "../components/RecipePreviewListBonus";
import { getMeals, DeleteMeal } from "../services/user.js";

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
        const response = await getMeals();
        if (response.status == 200) {
          this.recipes = response.data.recipes;
        } else {
          console.log("Error fetching recipes: ", response);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async clearRecipes() {
      const response = await DeleteMeal();
      if (response.status == 200) {
        this.recipes.forEach(recipe => {
          const completedStepsKey = `completedSteps_${recipe.id}`;
          const totalStepsKey = `totalSteps_${recipe.id}`;
          sessionStorage.removeItem(completedStepsKey);
          sessionStorage.removeItem(totalStepsKey);
        });
        this.recipes = [];
        const username = this.$root.store.username;
        const mealsKey = `${username}_mealsPrepared`;
        sessionStorage.setItem(mealsKey, 0);
        this.$root.$emit('update-meal-count', 0);
        console.log('All recipes and progress data cleared successfully.');
      } else {
        console.log("Error clearing recipes: ", response);
      }
      this.recipes = [];
    },
  },
};
</script>

<style scoped>
.clear-button {
  margin-top: 20px; /* Adjust this value to move the button closer to the RecipePreviewListBonus component */
}
</style>
