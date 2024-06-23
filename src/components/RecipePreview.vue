<template>
  <div class="recipe-preview card">
    <div class="card-body">
      <div v-if="recipe.family">
        <a
          href="#"
          class="card-link hoverable"
          title="Go to recipe"
          @click="handleClick($event, 'RecipeViewPageFamily')"
        >
          <img
            :src="recipe.image"
            class="card-img-top fixed-size"
            alt="Recipe image"
            title="Go to recipe"
          />
          <h5 class="card-title">{{ recipe.title }}</h5>
        </a>
      </div>
      <div v-else>
        <a
          href="#"
          class="card-link hoverable"
          title="Go to recipe"
          @click="handleClick($event, 'recipe')"
        >
          <img
            :src="recipe.image"
            class="card-img-top fixed-size"
            alt="Recipe image"
            title="Go to recipe"
          />
          <h5 class="card-title">{{ recipe.title }}</h5>
        </a>
      </div>
      <div class="info d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <i class="fas fa-clock"></i>
          <span class="ms-2">{{ recipe.readyInMinutes }} minutes</span>
        </div>
        <div class="d-flex align-items-center">
          <i class="fas fa-heart"></i>
          <span class="ms-2">{{ recipe.aggregateLikes }} likes</span>
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <FavoriteButtonComponent :recipeId="recipe.id" :initialFavoriteState="isFavorite" @click.stop />
          <RecipeLogos :recipe="recipe" />
          <i :class="viewedIconClass" class="viewed-icon"></i>
        </li>
      </ul>
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
  },
  methods: {
    markAsViewed() {
      if (!this.recipe.isViewed) {
        this.recipe.isViewed = true;
        console.log(`Recipe ${this.recipe.title} marked as viewed`);
        // Here you can add code to update the viewed state in your backend or store
      }
    },
    handleClick(event, routeName) {
      // Mark the recipe as viewed for all types of clicks
      this.markAsViewed();

      // Check if the event is a middle-click or if Ctrl/Meta key is pressed (for opening in a new tab)
      if (event.button === 1 || event.ctrlKey || event.metaKey) {
        // Allow the default action to proceed
        return;
      }
      
      // Prevent default for left-click to handle navigation programmatically
      event.preventDefault();
      this.$router.push({ name: routeName, params: { recipeId: this.recipe.id } });
    }
  },
  computed: {
    viewedIconClass() {
      return this.recipe.isViewed ? "fas fa-eye" : "far fa-eye";
    }
  }
};
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

.recipe-preview {
  display: inline-block;
  margin: 10px 10px;
  width: 18rem; /* Ensure all cards are the same width */
}

.card-body {
  padding: 0.5rem;
}

.fixed-size {
  width: 100%;
  height: 200px; /* Set a fixed height for the images */
  object-fit: cover; /* Ensure the image covers the entire area without stretching */
}

.recipe-preview .card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.info {
  padding: 10px;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  font-size: 1rem;
}

.info i {
  color: #ff4500;
  margin-right: 5px;
}

.info span {
  margin-left: 5px;
}

.recipe-preview .list-group-item {
  font-size: 0.9rem;
}

.hoverable:hover {
  cursor: pointer;
  opacity: 0.8;
}

.viewed-icon {
  color: green;
  font-size: 1.5rem;
}

.favorite-button i {
  color: gold;
  font-size: 1.5rem;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
