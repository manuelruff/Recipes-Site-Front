<template>
  <div class="recipe-preview card" style="width: 18rem;">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="card-link hoverable"
    >
      <img
        :src="recipe.image"
        class="card-img-top hoverable"
        alt="Recipe image"
      />
    </router-link>
    <div class="card-body">
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="card-link hoverable"
      >
        <h5 class="card-title hoverable">{{ recipe.title }}</h5>
      </router-link>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ recipe.readyInMinutes }} minutes</li>
        <li class="list-group-item">{{ recipe.aggregateLikes }} likes</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
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
