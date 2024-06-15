<template>
  <div class="recipe-preview card" style="width: 18rem;">
    <div class="card-body">
    <div v-if="recipe.family">
      <router-link
        :to="{ name: 'RecipeViewPageFamily', params: { recipeId: recipe.id } }"
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
    </div>
    <div v-else>
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
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        {{ recipe.readyInMinutes }} minutes
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {{ recipe.aggregateLikes }} likes
        <FavoriteButtonComponent :recipeId="recipe.id" :initialFavoriteState="isFavorite" @click.stop />
      </li>
    </ul>
    <RecipeLogos :recipe="recipe" />
  </div>
  </div>
</template>

<script>
import FavoriteButtonComponent from "./FavoriteButtonComponent.vue";
import RecipeLogos from "./RecipeLogos.vue";

export default {
  name: "RecipePreview",
  components: {
    FavoriteButtonComponent,
    RecipeLogos
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
</style>
