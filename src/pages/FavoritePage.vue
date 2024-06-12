<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1> -->
    <div class="row">
      <!-- Left side for random recipes -->
        <RecipePreviewList
          ref="recipeList"
          title="Favorite recipes"
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
        const response = mockGetRecipesPreview2(amountToFetch);
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

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); 
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
