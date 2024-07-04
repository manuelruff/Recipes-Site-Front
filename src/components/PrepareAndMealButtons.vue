<template>
  <div v-if="$root.store.username" class="bottom-right-links">
    <button @click="prepareAndAddToMeal" class="action-button">Prepare</button>
    <button @click="addToMeal" class="action-button">Add to Meal</button>
  </div>
</template>

<script>
import { mockAddToMeal } from "../services/user.js";

export default {
  name: 'PrepareAndMealButtons',
  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    }
  },
  methods: {
    addToMeal() {
      console.log('Adding recipe to meal:', this.recipeId); // Debug log
      mockAddToMeal(this.recipeId);
      let mealsPrepared = sessionStorage.getItem('mealsPrepared');

      if (!mealsPrepared) {
        mealsPrepared = 1;
      } else {
        mealsPrepared = parseInt(mealsPrepared) + 1;
      }

      sessionStorage.setItem('mealsPrepared', mealsPrepared);
      this.$root.$emit('update-meal-count', mealsPrepared);
    },
    prepareAndAddToMeal() {
      this.addToMeal(); // First add to meal
      this.$router.push({ name: 'PreparePage', params: { recipeId: this.recipeId } }); // Then navigate to Prepare page
    }
  }
};
</script>

<style scoped>
.bottom-right-links {
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
}
.action-button {
  margin: 4px 0;
  padding: 8px 12px;
  background-color: #ff6347;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
}
.action-button:hover {
  background-color: #e55347; /* Slightly darker for hover effect */
}
</style>
