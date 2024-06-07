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
        <li class="nav-item dropdown" v-if="$root.store.username">
          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Personal
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item active" href="#">Action</a>
            <a class="dropdown-item active" href="#">Another action</a>
          </div>
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
</style>
