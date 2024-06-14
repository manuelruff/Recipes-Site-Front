<template>
  <div class="container">
    <div class="row">
      <RecipePreviewListFamily
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
import RecipePreviewListFamily from "../components/RecipePreviewListFamily";
import { mockGetFamilyRecipesPreview } from "../services/recipes.js";

export default {
  name: "FamilyRecipesPage",
  components: {
    RecipePreviewListFamily,
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
