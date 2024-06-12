<template>
  <div class="recipe-preview card" style="width: 18rem;" @click="handleCardClick">
    <div class="card-body">
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="card-link hoverable"
        title="Go to recipe"
      >
        <img
          :src="recipe.image"
          class="card-img-top"
          alt="Recipe image"
          title="Go to recipe"
        />
        <h5 class="card-title">{{ recipe.title }}</h5>
      </router-link>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          {{ recipe.readyInMinutes }} minutes
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ recipe.aggregateLikes }} likes
          <FavoriteButtonComponent :recipeId="recipe.id" :initialFavoriteState="isFavorite" />
        </li>
      </ul>
      <div class="logos">
        <img v-if="recipe.glutenFree" src="@/assets/pictures/gluten_free.jpg" alt="Gluten Free" class="logo" />
        <img v-if="recipe.vegetarian" src="@/assets/pictures/vegeterian.jpg" alt="Vegetarian" class="logo" />
        <img v-if="recipe.vegan" src="@/assets/pictures/vegan.png" alt="Vegan" class="logo" />
      </div>
    </div>
  </div>
</template>

<script>
import { mockAddLastViewedRecipe } from "../services/user.js";
import FavoriteButtonComponent from "./FavoriteButtonCompommemt.vue";

export default {
  name: "RecipePreview",
  components: {
    FavoriteButtonComponent
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    initialFavoriteState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFavorite: this.initialFavoriteState
    };
  },
  methods: {
    handleCardClick() {
      console.log("Card clicked");
      // Your action here
      // mock to save something the user pressed to last viewed
      mockAddLastViewedRecipe(this.recipe.id);
      console.log("Added to last viewed recipes");
    }
  }
};
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

.card-body {
  padding: 0.5rem;
}
.recipe-preview {
  display: inline-block;
  margin: 10px 10px;
}
.recipe-preview .card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
.recipe-preview .list-group-item {
  font-size: 0.9rem;
}
.card-link {
  text-decoration: none;
  color: inherit;
}
.card-link:hover {
  text-decoration: none;
}
.hoverable:hover {
  cursor: pointer;
  opacity: 0.8;
}
.logos {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.logo {
  width: 30px;
  height: 30px;
  margin: 0 5px;
}
</style>
