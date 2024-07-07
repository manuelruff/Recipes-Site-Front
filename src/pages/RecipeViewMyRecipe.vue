<template>
  <div class="container">
    <div v-if="recipe" class="recipe-container">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center recipe-image" />
        <RecipeLogos :recipe="recipe" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</div>
              <div><strong>Servings:</strong> {{ recipe.servings }}</div>
            </div>
            <h3>Ingredients:</h3>
            <ul class="ingredients-list">
              <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index + '_' + ingredient.name">
                {{ ingredient.amount }} {{ ingredient.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h3>Instructions:</h3>
            <ol class="instructions-list">
              <li v-for="(instruction, index) in recipe.instructions" :key="index">
                <div>
                  <span class="step-number">{{ index + 1 }}.</span> {{ instruction }}
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFullViewMyRecipe } from "../services/user.js";
import RecipeLogos from "../components/RecipeLogos.vue";

export default {
  components: {
    RecipeLogos,
  },
  data() {
    return {
      recipe: null,
      isFavorite: false // Assuming you have a way to get the initial favorite state
    };
  },
  async created() {
    try {
      const response = await getFullViewMyRecipe(this.$route.params.recipeId);
      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }

      // Log the entire response to verify its structure
      console.log("Full response:", response);

      // Extract the recipe object from the array
      const recipeArray = response.data;
      if (Array.isArray(recipeArray) && recipeArray.length > 0) {
        const recipe = recipeArray[0];

        console.log("Recipe details:", recipe);

        this.recipe = {
          instructions: recipe.instructions || [],
          extendedIngredients: recipe.ingredients || [], // Map ingredients to extendedIngredients
          aggregateLikes: recipe.aggregateLikes || 0,
          readyInMinutes: recipe.readyInMinutes || 0,
          image: recipe.image || "",
          title: recipe.title || "No Title",
          servings: recipe.servings || 1,
          glutenFree: recipe.glutenFree || false,
          vegetarian: recipe.vegetarian || false,
          vegan: recipe.vegan || false,
          id: Number(recipe.id) // Ensure the id is a number
        };

        // Log the mapped recipe object to verify data assignment
        console.log("Mapped Recipe data:", this.recipe);
      } else {
        this.$router.replace("/NotFound");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      this.$router.replace("/NotFound");
    }
  }
};
</script>

<style scoped>
.recipe-header {
  text-align: center;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.wrapped {
  width: 100%;
  padding: 8px;
}
@media (min-width: 768px) {
  .wrapped {
    width: 50%;
  }
}
ul {
  list-style-type: none;
  padding: 0;
}
h3 {
  margin-top: 16px;
}
</style>s