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
        <b-form-select
          v-model="sortBy"
          :options="sortOptions"
          class="form-control mr-sm-2"
          @change="onSortChange"
      ></b-form-select>
      </form>
    </nav>
    <div v-if="results.length" class="mt-4">
      
      <RecipePreviewList
        ref="recipeList"
        title="Search Results"
        :displayCount="resultsPerPage"
        class="RandomRecipes center"
        :recipes="results"
      />
    </div>
    <div v-else class="mt-4">
      <p>No results found</p>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetRecipesPreview2, mockGetSearchResults } from "../services/recipes.js";

export default {
  name: "SearchPage",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      query: "",
      results: [],
      resultsPerPage: 5,
      sortBy: "likes", // Default sorting option
      selectedFilters: {
        diet: [],
        cuisine: [],
        intolerances: []
      },
      resultsOptions: [5, 10, 15],
      dietOptions: [
        { value: "vegetarian", text: "Vegetarian" },
        { value: "vegan", text: "Vegan" },
      ],
      cuisineOptions: [
        { value: "italian", text: "Italian" },
        { value: "mexican", text: "Mexican" },
      ],
      intolerancesOptions: [
        { value: "dairy", text: "Dairy" },
        { value: "gluten", text: "Gluten" },
        { value: "peanut", text: "Peanut" },
      ],
      sortOptions: [
        { value: "likes", text: "Likes" },
        { value: "time", text: "Time" },
      ],
    };
  },
  created() {
    this.loadState();
  },
  methods: {
    loadState() {
      const searchQuery = sessionStorage.getItem('searchQuery');
      const searchResults = sessionStorage.getItem('searchResults');
      const resultsPerPage = sessionStorage.getItem('resultsPerPage');
      const sortBy = sessionStorage.getItem('sortBy');
      const selectedFilters = sessionStorage.getItem('selectedFilters');

      

      if (searchQuery) {
        this.query = searchQuery;
      }
      if (searchResults) {
        this.results = JSON.parse(searchResults);
      }
      if (resultsPerPage) {
        this.resultsPerPage = parseInt(resultsPerPage);
      }
      if (sortBy) {
        this.sortBy = sortBy;
      }
      if (selectedFilters) {
        this.selectedFilters = JSON.parse(selectedFilters);
      }
    },
    saveState() {
      sessionStorage.setItem('searchQuery', this.query);
      sessionStorage.setItem('searchResults', JSON.stringify(this.results));
      sessionStorage.setItem('resultsPerPage', this.resultsPerPage);
      sessionStorage.setItem('sortBy', this.sortBy);
      sessionStorage.setItem('selectedFilters', JSON.stringify(this.selectedFilters));
    },
    onSearch() {
      try {
        const amountToFetch = this.resultsPerPage; // Set this to how many recipes you want to fetch
        const response = mockGetRecipesPreview2(amountToFetch);
        console.log(response);
        const recipes = response.data.recipes;
        console.log(recipes);
        this.results = recipes;
        console.log(this.results);
        this.sortResults(); // Sort the results after fetching
        this.saveState(); // Save state after fetching and sorting
      } catch (error) {
        console.log(error);
      }

      // manu key
      const apiKey = 'dfc0343255df402babb592636a733295';
      // omri key
      // const url = `https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&number=${this.resultsPerPage}&diet=${dietString}&cuisine=${cuisineString}&intolerances=${intolerancesString}&apiKey=${apiKey}&addRecipeInformation=true`;
      // Log the URL and parameters to the console
      // console.log("Generated URL:", url);
      // try {
      //   const response = await fetch(url);
      //   const data = await response.json();
      //   this.results = data.results;
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }
      const dietString = this.selectedFilters.diet.join(',');
      const cuisineString = this.selectedFilters.cuisine.join(',');
      const intolerancesString = this.selectedFilters.intolerances.join(',');
      console.log("Query:", this.query);
      console.log("Results Per Page:", this.resultsPerPage);
      console.log("Diet:", dietString);
      console.log("Cuisine:", cuisineString);
      console.log("Intolerances:", intolerancesString);
      console.log("searching...");
      mockGetSearchResults(this.query, amountToFetch, dietString, cuisineString, intolerancesString);
    },
    onSortChange() {
      console.log("Sort option changed:", this.sortBy);
      this.sortResults();
      this.saveState(); // Save state after sorting
    },
    sortResults() {
      if (this.sortBy === "likes") {
        this.results.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      } else if (this.sortBy === "time") {
        this.results.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
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
