<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in randomizedRecipes.slice(0, displayCount)" :key="r.id">
        <RecipePreviewFamily class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewFamily from "./RecipePreviewFamily.vue";

export default {
  name: "RecipePreviewListFamily",
  components: {
    RecipePreviewFamily
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
      handler() {
        if (this.randomize) {
          this.randomizeRecipes();
        } else {
          this.randomizedRecipes = [...this.recipes];
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
