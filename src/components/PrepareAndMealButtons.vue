<template>
  <div v-if="$root.store.username" class="bottom-right-links">
    <button @click="prepareAndAddToMeal" class="action-button">Prepare</button>
    <button @click="addToMeal" class="action-button">Add to Meal</button>
  </div>
</template>

<script>
import { mockAddToMeal ,PostMeal} from "../services/user.js";

export default {
  name: 'PrepareAndMealButtons',
  computed: {
    recipeId() {
      return this.$route.params.recipeId;
    }
  },
  methods: {
    async addToMeal() {
    console.log('Adding recipe to meal:', this.recipeId); // Debug log
    const response = await PostMeal(this.recipeId);
    if (response.status === 200) {
        // Retrieve username from the root store
        const username = this.$root.store.username;

        // Build a unique sessionStorage key with the username
        const mealsKey = `${username}_mealsPrepared`;

        let mealsPrepared = sessionStorage.getItem(mealsKey);
        if (!mealsPrepared) {
            mealsPrepared = 1;
        } else {
            mealsPrepared = parseInt(mealsPrepared) + 1;
        }

        sessionStorage.setItem(mealsKey, mealsPrepared);
        this.$root.$emit('update-meal-count', mealsPrepared);
    } else {
        console.error("Error in adding recipe to meal:", response.message);
    }
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
