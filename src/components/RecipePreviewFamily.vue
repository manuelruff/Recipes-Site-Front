<template>
  <div class="recipe-preview card" style="width: 18rem;">
    <div class="card-body">
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
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          {{ recipe.readyInMinutes }} minutes
        </li>
      </ul>
      <RecipeLogos :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import RecipeLogos from "./RecipeLogos.vue";

export default {
  name: "RecipePreviewFamily",
  components: {
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
