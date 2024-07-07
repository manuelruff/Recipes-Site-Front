<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in randomizedRecipes.slice(0, displayCount)" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { getFavoriteAndViewed } from "../services/user.js";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true,
      default: () => []
    },
    displayCount: {
      type: Number,
      default: 3
    },
    randomize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      randomizedRecipes: []
    };
  },
  methods: {
    randomizeRecipes() {
      const recipesCopy = [...this.recipes];
      for (let i = recipesCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [recipesCopy[i], recipesCopy[j]] = [recipesCopy[j], recipesCopy[i]];
      }
      this.randomizedRecipes = recipesCopy;
    }
  },
  watch: {
    recipes: {
      async handler() {
        if (this.randomize) {
          this.randomizeRecipes();
        } else {
          this.randomizedRecipes = [...this.recipes];
        }
        // we want to get for each recipe if it is viewed or not and if its favorite or not
        if (this.$root.store.username) {
          try {
            const response = await getFavoriteAndViewed();
            console.log("Response: ", response);
            if (response.status == 200) {
              const favoriteRecipes = response.data.favoriteRecipes;
              const lastViewedRecipes = response.data.lastViewedRecipes;
              console.log("Favorite recipes: ", favoriteRecipes);
              console.log("Last viewed recipes: ", lastViewedRecipes);
              for (let i = 0; i < this.randomizedRecipes.length; i++) {
                if (favoriteRecipes.includes(this.randomizedRecipes[i].id)) {
                  this.randomizedRecipes[i].isFavorite = true;
                }
                if (lastViewedRecipes.includes(this.randomizedRecipes[i].id)) {
                  this.randomizedRecipes[i].isViewed = true;
                }
              }
            }
            else{
              console.log("Error fetching favorite and viewed recipes: ", response);
            }
            
          } catch (error) {
            console.log(error);
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>