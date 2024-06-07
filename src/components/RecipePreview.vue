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
        title="Go to recipe"
      />
    </router-link>
    <div class="card-body">
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="card-link hoverable"
        title="Go to recipe"
      >
        <h5 class="card-title">{{ recipe.title }}</h5>
      </router-link>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          {{ recipe.readyInMinutes }} minutes
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {{ recipe.aggregateLikes }} likes
          <b-button
            v-if="!isFavorite"
            variant="outline-warning"
            @click="toggleFavorite"
          >
            Favourite
          </b-button>
          <b-button
            v-else
            variant="success"
            :pressed="true"
            disabled
          >
            In your FAV!
          </b-button>
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
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false
    };
  },
  methods: {
    toggleFavorite() {
      if (!this.isFavorite) {
        this.isFavorite = true;
        // Add the recipe to the favorites list (this could be a call to a Vuex store action or an API request)
        this.$root.store.addFavorite(this.recipe);
      }
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
.star-button {
  border: none;
  background: black;
  color: #ffc107;
}
.star-button.active {
  color: #ffc107;
}
.star-button i {
  font-size: 1rem;
}
</style>

