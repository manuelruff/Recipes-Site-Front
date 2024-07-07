<template>
  <div class="container">
    <div v-if="recipe" class="recipe-container">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <h3><span>Owner:</span> {{ recipe.owner }}</h3>
        <img :src="recipe.image" class="center recipe-image" />
        <div class="image-container">
          <img :src="recipe.image1" alt="Image 1">
          <img :src="recipe.image2" alt="Image 2">
          <img :src="recipe.image3" alt="Image 3">
          <img :src="recipe.image4" alt="Image 4">
        </div>
        <div class="story-wrapper">
          <h3>Story:</h3>
          <li>{{ recipe.story }}</li>
        </div>
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
              <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h3>Instructions:</h3>
            <ol class="instructions-list">
              <li v-for="(s, index) in recipe._instructions" :key="index">
                <div>
                  <span class="step-number">{{ index + 1 }}.</span> {{ s.step }}
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <PrepareAndMealButtons/> />
  </div>
</template>

<script>
import { mockGetFamilyRecipeById } from "../services/recipes.js";
import RecipeLogos from "../components/RecipeLogos.vue";
import PrepareAndMealButtons from "../components/PrepareAndMealButtons.vue";
import { mockAddLastViewedRecipe } from "../services/user.js";

export default {
  components: {
    RecipeLogos,
    PrepareAndMealButtons,
  },
  data() {
    return {
      recipe: null,
      isFavorite: false, // Assuming you have a way to get the initial favorite state
    };
  },
  async created() {
    try {
      let response;
      try {
        response = mockGetFamilyRecipeById(this.$route.params.recipeId);
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
        readyInMinutes,
        image,
        image1,
        image2,
        image3,
        image4,
        owner,
        title,
        servings,
        glutenFree,
        vegetarian,
        vegan,
        id,
        story,
      } = response.data.recipe;

      const _instructions = analyzedInstructions
        .map(fstep => fstep.steps.map(step => ({ ...step, step: fstep.name + step.step })))
        .flat();

      this.recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        readyInMinutes,
        image,
        image1,
        image2,
        image3,
        image4,
        owner,
        title,
        servings,
        glutenFree,
        vegetarian,
        vegan,
        id,
        story,
      };
    } catch (error) {
      console.log(error);
    }
    mockAddLastViewedRecipe(this.recipe.id);
    console.log("Added to last viewed recipes " + this.recipe.id);
  },
};
</script>

<style scoped>
.recipe-header {
  text-align: center;
}
.story-wrapper {
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
.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adjust width of each image */
  gap: 10px; /* Adjust gap between images */
}
.image-container img {
  width: 100%; /* Ensure images fill their container */
  height: 200px; /* Fixed height for all images */
  object-fit: cover; /* Ensures images maintain aspect ratio and cover the allocated space */
  border-radius: 8px; /* Adds rounded corners to images */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow to images */
}
</style>
