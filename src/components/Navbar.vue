<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <router-link class="navbar-brand" :to="{ name: 'main' }">Vue Recipes</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <!-- Left side of the navbar -->
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'main' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'search' }">Search</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
        </li>
        <!-- Dropdown for personal actions -->
        <li v-if="$root.store.username" class="nav-item-dropdown">
          <b-nav-item-dropdown text="Personal" right>
            <template v-slot:default>
              <router-link :to="{ name: 'favorite' }" class="dropdown-item">Favorites</router-link>
              <router-link :to="{ name: 'myRecipe' }" class="dropdown-item">My recipes</router-link>
              <router-link :to="{ name: 'myFamily' }" class="dropdown-item">Family recipes</router-link>
            </template>
          </b-nav-item-dropdown>
        </li>
        <!-- New Recipe link -->
        <li v-if="$root.store.username" class="nav-item">
          <a class="nav-link" href="#" @click.prevent="openCreateRecipeModal">New Recipe</a>
        </li>
      </ul>
      
      <!-- Right side of the navbar -->
      <ul class="navbar-nav">
        <!-- Guest actions -->
        <li v-if="!$root.store.username" class="nav-item">
          <span class="navbar-text text-light">Guest:</span>
          <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
          <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
        </li>
        <!-- Logged in user actions -->
        <li v-if="$root.store.username" class="nav-item">
          <div style="position: relative;">
            <router-link class="nav-link" :to="{ name: 'MealPage' }">
              MealPage
              <span class="meal-count">{{ mealCount }}</span>
            </router-link>
          </div>
          <div class="nav-content">
            <span class="navbar-text text-light">{{ $root.store.username }}:</span>
            <button class="nav-link btn btn-link text-light" @click="logout">Logout</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Include CreateRecipeModal component -->
    <CreateRecipeModal ref="createRecipeModal" @recipe-created="handleRecipeCreated" />
  </nav>
</template>

<script>
import CreateRecipeModal from './NewRecipeModal.vue';

export default {
  name: 'Navbar',
  components: {
    CreateRecipeModal
  },
  data() {
    return {
      mealCount: 0
    };
  },
  mounted() {
    console.log('Navbar mounted'); // Debug statement
    this.$root.$on('update-meal-count', this.updateMealCount); // Listen for the event

    // Retrieve username from the root store
    const username = this.$root.store.username;

    // If username is available, fetch the user-specific meal count
    if (username) {
        const mealsKey = `${username}_mealsPrepared`;
        const storedMealCount = sessionStorage.getItem(mealsKey);
        this.mealCount = storedMealCount ? parseInt(storedMealCount) : 0;
    } else {
        // Handle guest or no-login scenario
        this.$root.toast("Hello Guest", "Welcome to Vue Recipes website!", "success");
        this.mealCount = 0; // Optionally set a default value for guests or not logged in users
    }
  },
  beforeDestroy() {
    this.$root.$off('update-meal-count', this.updateMealCount); // Clean up the event listener
  },
  methods: {
    updateMealCount(count) {
      console.log('Meal count updated:', count); // Debug statement
      this.mealCount = count;
    },
    openCreateRecipeModal() {
      this.$refs.createRecipeModal.openModal();
    },
    clearSearchState() {
      sessionStorage.removeItem('searchQuery');
      sessionStorage.removeItem('searchResults');
      sessionStorage.removeItem('resultsPerPage');
      sessionStorage.removeItem('sortBy');
      sessionStorage.removeItem('selectedFilters');
    },
    clearSessionStorage() {
      console.log("Clearing session storage...");
      sessionStorage.clear();
      console.log("Session storage cleared.");
    },
    logout() {
      this.$root.store.logout();
      this.clearSearchState(); // Clear the search state
      this.clearSessionStorage(); // Clear all session storage
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    handleRecipeCreated() {
      // Optionally handle actions after a recipe is successfully created
      this.$router.push({ name: 'main' }); // Redirect or refresh as needed
      this.$root.toast("Success", "Recipe created successfully", "success");
    }
  }
};
</script>

<style scoped>
.custom-navbar {
  background-color: rgba(0, 0, 0, 0.8); /* 50% transparent background */
}

.navbar-brand,
.navbar-nav .nav-link,
.navbar-nav .dropdown-item {
  color: orange !important; 
}

.navbar-brand:hover,
.navbar-nav .nav-link:hover,
.navbar-nav .dropdown-item:hover {
  color: yellow !important;
}

.navbar {
  margin-bottom: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-content {
  display: flex;
  align-items: center;
}

.navbar-text {
  margin-right: 10px; 
}

.badge {
  background-color: #ff6347;
}

.meal-count {
  display: inline-block;
  background-color: orange;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-left: 5px;
  font-size: 14px;
}
</style>
