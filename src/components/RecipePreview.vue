<template>
  <div class="recipe-preview card" style="width: 18rem;">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="card-link hoverable"
    >
      <img
        :src="recipe.image"
        class="card-img-top"
        alt="Recipe image"
      />
    </router-link>
    <div class="card-body">
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="card-link hoverable"
      >
        <h5 class="card-title">{{ recipe.title }}</h5>
      </router-link>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ recipe.readyInMinutes }} minutes</li>
        <li class="list-group-item">{{ recipe.aggregateLikes }} likes</li>
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
