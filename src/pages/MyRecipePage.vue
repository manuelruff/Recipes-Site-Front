<template>
  <div class="container">
    <!-- Simple link to "My recipe page" -->
    <div class="link-container">
    </div>
    <div class="row">
      <RecipePreviewList
        ref="recipeList"
        title="My recipes"
        class="RandomRecipes center"
        :recipes="recipes"
        :displayCount="recipes.length"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetRecipesPreview2 } from "../services/recipes.js";
import {getMyRecipe} from "../services/user.js";

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
        //const amountToFetch = 8; // Adjust number of recipes to fetch as needed
        //const response = mockGetRecipesPreview2(amountToFetch);
        const response = await getMyRecipe();
        if (response.status == 200) {
          this.recipes = response.data.recipes;
          console.log("this is recipes: ", this.recipes)
        }
        else {
          console.log("Error fetching recipes: ", response);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
  }
};
</script>