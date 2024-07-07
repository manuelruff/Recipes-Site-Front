<template>
  <div class="container">
    <div class="row">
        <RecipePreviewList
          ref="recipeList"
          title="Favorite recipes"
          :displayCount=2
          class="RandomRecipes center"
          :recipes="recipes"
        />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import {getFavorites} from "../services/user.js";
// import { mockGetRecipesPreview2,mockGetFavoriteRecipes,getFavorites } from "../services/recipes.js";

export default {
  name: "FavoritePage",
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
        const amountToFetch = 8; // Set this to how many recipes you want to fetch
        // lets say mockGetRecipesPreview2 is mock for get favorite
        // mockGetFavoriteRecipes(amountToFetch,$root.store.username);
        // then actually reading defult recipes
        // const response = mockGetRecipesPreview2(amountToFetch);
        const response =await getFavorites(amountToFetch); 
        if (response.status == 200) {
          this.recipes = response.data.recipes;
          console.log("this is recipes: ", this.recipes)
        }
        else {
          console.log("Error fetching recipes: ", response);
        }

      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>