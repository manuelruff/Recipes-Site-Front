<template>
  <div class="container">
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe-container mb-5">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <RecipeLogos :recipe="recipe" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</div>
              <div><strong>Likes:</strong> {{ recipe.aggregateLikes }} likes</div>
              <div><strong>Servings:</strong> {{ recipe.servings }}</div>
              <FavoriteButtonComponent :recipeId="recipe.id" :initialFavoriteState="isFavorite(recipe.id)" />
            </div>
            <h3>Ingredients:</h3>
            <ul>
              <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h3>Instructions:</h3>
            <ol class="instructions-list">
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
import RecipeLogos from "../components/RecipeLogos.vue";
import FavoriteButtonComponent from "../components/FavoriteButtonComponent.vue";
import { mockGetAllFamilyRecipes } from "../services/recipes.js";

export default {
  components: {
    RecipeLogos,
    FavoriteButtonComponent
  },
  data() {
    return {
      recipes: [],
      favoriteRecipes: [] // Array to hold favorite recipe IDs
    };
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    fetchRecipes() {
      const response = mockGetAllFamilyRecipes();
      this.recipes = response.data.recipes;
      console.log(this.recipes); // Check the image URLs
    },
    isFavorite(recipeId) {
      return this.favoriteRecipes.includes(recipeId);
    }
  }
};
</script>

<style scoped>
.recipe-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}
.recipe-header {
  text-align: center;
}
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.carousel-item {
  flex: none;
  scroll-snap-align: center;
  margin-right: 8px;
}
.recipe-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
  border-radius: 8px;
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
li::before {
  content: '•';
  color: #ff6347;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
.instructions-list {
  counter-reset: item;
  list-style-type: none;
  padding: 0;
}
.instructions-list li {
  margin-bottom: 10px;
  counter-increment: item;
  position: relative;
  padding-left: 2em;
}
.instructions-list li::before {
  content: counter(item) ".";
  position: absolute;
  left: 0;
  font-weight: bold;
  color: #ff6347;
}
h3 {
  margin-top: 16px;
}
</style>