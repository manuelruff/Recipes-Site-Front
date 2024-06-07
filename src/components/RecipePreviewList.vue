<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview,  mockGetRecipesPreview2 } from "../services/recipes.js";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // const response = await this.axios.get(
        //   this.$root.store.server_domain + "/recipes/random",
        // );

        const amountToFetch = 3; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview2(amountToFetch);

        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
        randomizeRecipes();
      } catch (error) {
        console.log(error);
      }
    },
    randomizeRecipes() {
      for (let i = this.recipes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.recipes[i], this.recipes[j]] = [this.recipes[j], this.recipes[i]];
      }
      // Trigger a re-render by setting the recipes array to a new reference
      this.recipes = [...this.recipes];
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
