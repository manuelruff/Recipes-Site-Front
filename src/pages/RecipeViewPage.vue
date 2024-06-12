<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
        <RecipeLogos :recipe="recipe" />

      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>Servings: {{ recipe.servings }}</div>
              <FavoriteButtonComponent :recipeId="recipe.id" :initialFavoriteState="isFavorite" />
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockAddLastViewedRecipe, mockRemoveFavorite, mockAddFavorite } from "../services/user.js";
import { mockGetRecipeFullDetails2 } from "../services/recipes.js";
import RecipeLogos from "../components/RecipeLogos.vue";
import FavoriteButtonComponent from "../components/FavoriteButtonComponent.vue";

export default {
  components: {
    RecipeLogos,
    FavoriteButtonComponent
  },
  data() {
    return {
      recipe: null,
      isFavorite: false // Assuming you have a way to get the initial favorite state
    };
  },
  async created() {
    try {
      let response;

      try {
        response = mockGetRecipeFullDetails2(this.$route.params.recipeId);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      const {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        glutenFree,
        vegetarian,
        vegan,
        id // Ensure you get the recipe ID
      } = response.data.recipe;

      const _instructions = analyzedInstructions
        .map(fstep => fstep.steps.map(step => ({ ...step, step: fstep.name + step.step })))
        .flat();

      this.recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        glutenFree,
        vegetarian,
        vegan,
        id // Assign the recipe ID
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    AddLastViewedRecipe() {
      // mock to save something the user pressed to last viewed
      mockAddLastViewedRecipe(this.recipe.id);
      console.log("Added to last viewed recipes");
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
