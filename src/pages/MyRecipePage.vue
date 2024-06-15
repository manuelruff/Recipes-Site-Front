<template>
  <div class="container">
    <!-- Simple link to "My recipe page" -->
    <div class="link-container">
    </div>
    <div class="row">
      <RecipePreviewList
        ref="recipeList"
        title="My recipes"
        :displayCount=2
        class="RandomRecipes center"
        :recipes="recipes"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetRecipesPreview2 } from "../services/recipes.js";

export default {
  name: "BasicPage",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      try {
        const amountToFetch = 8; // Adjust number of recipes to fetch as needed
        const response = mockGetRecipesPreview2(amountToFetch);
        this.recipes = response.data.recipes;
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
  }
};
</script>