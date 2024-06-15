<template>
  <div class="container">
    <div class="row">
      <RecipePreviewList
        ref="recipeList"
        title="Family Recipes"
        :displayCount="8"
        class="RandomRecipes center"
        :recipes="recipes"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFamilyRecipesPreview } from "../services/recipes.js";

export default {
  name: "FamilyRecipesPage",
  components: {
    RecipePreviewList,
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
        const amountToFetch = 3; // Set this to how many recipes you want to fetch
        const response = mockGetFamilyRecipesPreview(amountToFetch);
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