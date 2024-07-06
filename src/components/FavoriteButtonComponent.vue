<template>
  <button  v-if="$root.store.username" @click.stop="toggleFavorite" class="favorite-button">
    <i :class="iconClass"></i>
  </button>
</template>

<script>
import { mockAddFavorite, mockRemoveFavorite,PostFavorite,DeleteFavorite } from "../services/user.js";

export default {
  name: "FavoriteButtonComponent",
  props: {
    recipeId: {
      type: Number,
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
    computed: {
      iconClass() {
        return this.isFavorite ? "fas fa-star" : "far fa-star";
      }
    },
    methods: {
      async toggleFavorite() {
        if (!this.isFavorite) {
          this.isFavorite = true;
          // Add the recipe to the favorites list
          // mockAddFavorite(this.recipeId);
          await PostFavorite(this.recipeId);
          console.log("Added to favorites");
        } else {
          this.isFavorite = false;
          // Remove the recipe from the favorites list
          // mockRemoveFavorite(this.recipeId);
          await DeleteFavorite(this.recipeId);
          console.log("Removed from favorites");
        }
      }
    }
};
</script>

<style scoped>
@import "~@fortawesome/fontawesome-free/css/all.css";

.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.favorite-button i {
  color: gold;
  font-size: 1.5rem;
}
</style>
