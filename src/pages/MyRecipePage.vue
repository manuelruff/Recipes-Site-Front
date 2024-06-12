<template>
  <div class="container">
    <!-- Simple link to "My recipe page" -->
    <div class="link-container">
    </div>
    <div class="row">
      <RecipePreviewList
        ref="recipeList"
        title="My recipes"
        displayCount=2
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

<style scoped>
.link-container {
  text-align: center; /* Centers the link horizontally */
  margin-bottom: 20px; /* Spacing before the recipe list */
}

.recipe-link {
  font-size: 20px; /* Increases font size for visibility */
  padding: 10px 15px; /* Padding around the text for easier clicking */
  background-color: #f4f4f4; /* Light gray background */
  border: 1px solid #ddd; /* Subtle border */
  border-radius: 5px; /* Rounded corners */
  color: #333; /* Dark text color for contrast */
  text-decoration: none; /* Removes underline */
  transition: background-color 0.3s, color 0.3s; /* Smooth hover effects */
}

.recipe-link:hover {
  background-color: #e9e9e9; /* Darker background on hover */
  color: #000; /* Black text on hover */
}

.RandomRecipes {
  margin: 10px 0; /* Vertical spacing for the recipe list */
}
</style>
