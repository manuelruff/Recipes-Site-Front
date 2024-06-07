<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline" @submit.prevent="onSearch">
        <input
          v-model="query"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <b-form-select
          v-model="resultsPerPage"
          :options="resultsOptions"
          class="form-control mr-sm-2"
        ></b-form-select>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
    <div v-if="results.length" class="mt-4">
      <h2>Search Results</h2>
      <ul>
        <li v-for="result in paginatedResults" :key="result.id">{{ result.title }}</li>
      </ul>
    </div>
    <div v-else class="mt-4">
      <p>No results found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPage",
  data() {
    return {
      query: "",
      results: [],
      resultsPerPage: 5,
      resultsOptions: [5, 10, 15]
    };
  },
  computed: {
    paginatedResults() {
      return this.results.slice(0, this.resultsPerPage);
    }
  },
  methods: {
    async onSearch() {
      // Replace with your actual search API call
      const response = await fetch(`https://api.example.com/search?q=${this.query}`);
      const data = await response.json();
      this.results = data.results;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.title {
  margin-top: 20px;
  text-align: center;
}
.navbar {
  margin-top: 20px;
}
</style>
