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
        <b-nav-item-dropdown text="Filtering" right class="mr-sm-2">
          <template v-slot:default>
            <div class="form-check" v-for="option in dietOptions" :key="option.value">
              <input class="form-check-input" type="checkbox" :value="option.value" v-model="selectedFilters.diet" :id="'diet-' + option.value">
              <label class="form-check-label" :for="'diet-' + option.value">{{ option.text }}</label>
            </div>
            <div class="dropdown-divider"></div>
            <div class="form-check" v-for="option in cuisineOptions" :key="option.value">
              <input class="form-check-input" type="checkbox" :value="option.value" v-model="selectedFilters.cuisine" :id="'cuisine-' + option.value">
              <label class="form-check-label" :for="'cuisine-' + option.value">{{ option.text }}</label>
            </div>
            <div class="dropdown-divider"></div>
            <div class="form-check" v-for="option in intolerancesOptions" :key="option.value">
              <input class="form-check-input" type="checkbox" :value="option.value" v-model="selectedFilters.intolerances" :id="'intolerance-' + option.value">
              <label class="form-check-label" :for="'intolerance-' + option.value">{{ option.text }}</label>
            </div>
          </template>
        </b-nav-item-dropdown>
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
      selectedFilters: {
        diet: [],
        cuisine: [],
        intolerances: []
      },
      resultsOptions: [5, 10, 15],
      dietOptions: [
        { value: "vegetarian", text: "Vegetarian" },
        { value: "vegan", text: "Vegan" },
        // add more diet options as needed
      ],
      cuisineOptions: [
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
    },
    selectedOptionsText() {
      const { diet, cuisine, intolerances } = this.selectedFilters;
      const allSelected = [...diet, ...cuisine, ...intolerances];
      return allSelected.join(', ');
    }
  },
  methods: {
  async onSearch() {
    // manu key
    const apiKey = 'dfc0343255df402babb592636a733295';
    // omri key
    const dietString = this.selectedFilters.diet.join(',');
    const cuisineString = this.selectedFilters.cuisine.join(',');
    const intolerancesString = this.selectedFilters.intolerances.join(',');
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&number=${this.resultsPerPage}&diet=${dietString}&cuisine=${cuisineString}&intolerances=${intolerancesString}&apiKey=${apiKey}`;
    // Log the URL and parameters to the console
    console.log("Generated URL:", url);
    console.log("Query:", this.query);
    console.log("Results Per Page:", this.resultsPerPage);
    console.log("Diet:", dietString);
    console.log("Cuisine:", cuisineString);
    console.log("Intolerances:", intolerancesString);
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


