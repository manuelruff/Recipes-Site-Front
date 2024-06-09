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
          v-model="diet"
          :options="dietOptions"
          class="form-control mr-sm-2"
          placeholder="Select Diet"
        ></b-form-select>
        <b-form-select
          v-model="cuisine"
          :options="cuisineOptions"
          class="form-control mr-sm-2"
          placeholder="Select Cuisine"
        ></b-form-select>
        <multiselect 
          v-model="intolerances" 
          :options="intolerancesOptions" 
          :multiple="true" 
          :taggable="true"
          placeholder="Select Intolerances"
          label="text"
          track-by="value"
          class="mr-sm-2"
        ></multiselect>
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
      diet: "",
      cuisine: "",
      intolerances: [],
      resultsOptions: [5, 10, 15],
      dietOptions: [
        { value: "", text: "All Diets" },
        { value: "vegetarian", text: "Vegetarian" },
        { value: "vegan", text: "Vegan" },
        // add more diet options as needed
      ],
      cuisineOptions: [
        { value: "", text: "All Cuisines" },
        { value: "italian", text: "Italian" },
        { value: "mexican", text: "Mexican" },
        // add more cuisine options as needed
      ],
      intolerancesOptions: [
        { value: "dairy", text: "Dairy" },
        { value: "gluten", text: "Gluten" },
        { value: "peanut", text: "Peanut" },
        // add more intolerance options as needed
      ],
    };
  },
  computed: {
    paginatedResults() {
      return this.results.slice(0, this.resultsPerPage);
    }
  },
  methods: {
    async onSearch() {
      const apiKey = 'YOUR_SPOONACULAR_API_KEY';
      const url = `https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&number=${this.resultsPerPage}&diet=${this.diet}&cuisine=${this.cuisine}&intolerances=${this.intolerances.join(',')}&apiKey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.results = data.results;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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
