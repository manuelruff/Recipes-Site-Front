<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" :to="{ name: 'main' }">Vue Recipes</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
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
        <li>
          <b-nav-item-dropdown text="Personal" v-if="$root.store.username">
            <router-link :to="{ name: 'favorite' }" class="dropdown-item">Favorites</router-link>
            <router-link :to="{ name: 'myRecipe' }" class="dropdown-item">My recipes</router-link>
            <router-link :to="{ name: 'myFamily' }" class="dropdown-item">Family recipes</router-link>
          </b-nav-item-dropdown>
        </li>

        <li class="nav-item" v-if="$root.store.username">
          <router-link class="nav-link" :to="{ name: 'new_rec' }">New Recipe</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="!$root.store.username">
          <span class="navbar-text text-light">Guest:</span>
          <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
        </li>
        <li class="nav-item" v-if="!$root.store.username">
          <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <span class="navbar-text text-light">{{ $root.store.username }}:</span>
          <button class="nav-link btn btn-link text-light" @click="Logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
.dropdown-item {
  color: black; /* Change to your desired text color */
}
</style>
