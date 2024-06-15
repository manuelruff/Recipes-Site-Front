<template>
    <button @click.stop="toggleFavorite" class="heart-button">
      <i :class="iconClass"></i>
    </button>
  </template>
  
  <script>
  import { mockAddFavorite, mockRemoveFavorite } from "../services/user.js";
  
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
        return this.isFavorite ? "fas fa-heart" : "far fa-heart";
      }
    },
    methods: {
      toggleFavorite() {
        if (!this.isFavorite) {
          this.isFavorite = true;
          // Add the recipe to the favorites list
          mockAddFavorite(this.recipeId);
          console.log("Added to favorites");
        } else {
          this.isFavorite = false;
          // Remove the recipe from the favorites list
          mockRemoveFavorite(this.recipeId);
          console.log("Removed from favorites");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  @import "~@fortawesome/fontawesome-free/css/all.css";
  
  .heart-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  .heart-button i {
    color: red;
    font-size: 1.5rem;
  }
  </style>
  