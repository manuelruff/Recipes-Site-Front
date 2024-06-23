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
    </div>
  </template>
  
  <script>
  import RecipePreviewListBonus from "../components/RecipePreviewListBonus";
  import { mockGetMealRecipesPreview } from "../services/recipes.js";
  
  export default {
    name: "FamilyRecipesPage",
    components: {
        RecipePreviewListBonus,
    },
    data() {
      return {
        recipes: [],
        lastViewedRecipes: []
      };
    },
    mounted() {
      this.fetchRecipes();
    },
    methods: {
      async fetchRecipes() {
        try {
          const response = mockGetMealRecipesPreview();
          console.log(response);
          const recipes = response.data.recipes;
          console.log(recipes);
          this.recipes = recipes;
        } catch (error) {
          console.log(error);
        }
      },
    }
  };
  </script>