<template>
  <div class="container">
    <div v-if="recipe" class="recipe-container">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center recipe-image" />
        <RecipeLogos :recipe="recipe" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</div>
              <div><strong>Likes:</strong> {{ recipe.aggregateLikes }} likes</div>
              <div>
                <strong>Servings:</strong> {{ adjustedServings }}
                <input type="number" v-model.number="multiplier" class="ml-2 multiplier-input" min="1" step="0.5"/>
              </div>
            </div>
            <h3>Ingredients:</h3>
            <ul class="ingredients-list">
              <li v-for="(r, index) in adjustedIngredients" :key="index + '_' + r.id">
                {{ r }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <h3>Instructions:</h3>
            <div v-for="(section, sectionIndex) in recipe.analyzedInstructions" :key="sectionIndex">
              <h4 v-if="section.name">{{ section.name }}</h4>
              <ol class="instructions-list">
                <li v-for="(s, stepIndex) in section.steps" :key="getCheckboxIndex(sectionIndex, stepIndex)">
                  <div>
                    <input type="checkbox" v-model="completedSteps[getCheckboxIndex(sectionIndex, stepIndex)]" @change="saveCheckboxState" />
                    <span class="step-number">{{ stepIndex + 1 }}.</span> {{ s.step }}
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="progress-bar-container mt-4">
        <b-progress :value="progressValue" variant="success" striped animated></b-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { BProgress } from 'bootstrap-vue';
import { getFullView } from "../services/recipes.js";
import RecipeLogos from "../components/RecipeLogos.vue";

export default {
  components: {
    RecipeLogos,
    BProgress
  },
  data() {
    return {
      recipe: null,
      isFavorite: false,
      multiplier: 1,
      adjustedIngredients: [],
      adjustedServings: 0,
      completedSteps: []
    };
  },
  async created() {
    try {
      let response = await getFullView(this.$route.params.recipeId);
      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }

      const {
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        glutenFree,
        vegetarian,
        vegan,
        id
      } = response.data.recipe;

      this.adjustedIngredients = extendedIngredients.map(ingredient => ingredient.original);
      this.adjustedServings = servings;

      const totalSteps = analyzedInstructions.flatMap(instr => instr.steps).length;
      this.completedSteps = this.getSavedCheckboxState(id, totalSteps);

      this.recipe = {
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        servings,
        glutenFree,
        vegetarian,
        vegan,
        id
      };
    } catch (error) {
      console.error("Error while initializing the recipe view:", error);
      this.$router.replace("/NotFound");
    }
  },
  watch: {
    multiplier(newValue, oldValue) {
      this.adjustQuantities();
    }
  },
  computed: {
    progressValue() {
      const totalSteps = this.completedSteps.length;
      const completedStepsCount = this.completedSteps.filter(step => step).length;
      return totalSteps ? (completedStepsCount / totalSteps) * 100 : 0;
    }
  },
  methods: {
    saveCheckboxState() {
      sessionStorage.setItem(`completedSteps_${this.recipe.id}`, JSON.stringify(this.completedSteps));
      sessionStorage.setItem(`totalSteps_${this.recipe.id}`, this.completedSteps.length.toString());
    },
    getSavedCheckboxState(recipeId, stepsCount) {
      const completed = sessionStorage.getItem(`completedSteps_${recipeId}`);
      // console.log(completed);
      const totalSteps = parseInt(sessionStorage.getItem(`totalSteps_${recipeId}`)) || stepsCount;
      this.totalSteps = totalSteps;  

      if (completed) {
        const parsedCompleted = JSON.parse(completed);
        return Array.isArray(parsedCompleted) ? parsedCompleted : new Array(totalSteps).fill(false);
      } else {
        return new Array(totalSteps).fill(false);
      }
    },
    getCheckboxIndex(sectionIndex, stepIndex) {
      const stepsBefore = this.recipe.analyzedInstructions.slice(0, sectionIndex).reduce((acc, section) => acc + section.steps.length, 0);
      return stepsBefore + stepIndex;
    }
  }
};
</script>

<style scoped>
.recipe-header { text-align: center; }
.wrapper { display: flex; flex-wrap: wrap; }
.wrapped { width: 100%; padding: 8px; }
@media (min-width: 768px) { .wrapped { width: 50%; } }
h3 { margin-top: 16px; }
.multiplier-input { width: 60px; margin-left: 8px; padding: 4px; }
.progress-bar-container { width: 100%; text-align: center; }
</style>
