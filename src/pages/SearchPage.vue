<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline w-100" @submit.prevent="onSearch">
        <div class="d-flex w-100">
          <input
            v-model="query"
            class="form-control flex-grow-1 mr-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <b-form-select
            v-model="resultsPerPage"
            :options="resultsOptions"
            class="form-control mr-2"
            style="width: auto;"
          ></b-form-select>
          <button class="btn btn-outline-success mr-2" type="submit">
            Search
          </button>
          <b-form-select
            v-model="sortBy"
            :options="sortOptions"
            class="form-control"
            style="width: auto;"
            @change="onSortChange"
          ></b-form-select>
        </div>
      </form>
    </nav>
    <div class="main-content">
      <div class="row results">
        <div v-if="results.length" class="col-12 mt-4">
          <RecipePreviewList
            ref="recipeList"
            title="Search Results"
            :displayCount="resultsPerPage"
            :recipes="results"
            class="RandomRecipes center"
          />
        </div>
        <div v-else class="col-12 mt-4">
          <p>No results found</p>
        </div>
      </div>
      <div class="filters">
        <b-button v-b-toggle.diet-collapse variant="link" class="text-custom">Diet</b-button>
        <b-collapse id="diet-collapse">
          <div class="form-check" v-for="option in dietOptions" :key="option.value">
            <input class="form-check-input" type="checkbox" :value="option.value" v-model="selectedFilters.diet" :id="'diet-' + option.value">
            <label class="form-check-label text-custom" :for="'diet-' + option.value">{{ option.text }}</label>
          </div>
        </b-collapse>
        <div class="dropdown-divider"></div>
        
        <b-button v-b-toggle.cuisine-collapse variant="link" class="text-custom">Cuisine</b-button>
        <b-collapse id="cuisine-collapse">
          <div class="form-check" v-for="option in cuisineOptions" :key="option.value">
            <input class="form-check-input" type="checkbox" :value="option.value" v-model="selectedFilters.cuisine" :id="'cuisine-' + option.value">
            <label class="form-check-label text-custom" :for="'cuisine-' + option.value">{{ option.text }}</label>
          </div>
        </b-collapse>
        <div class="dropdown-divider"></div>
        
        <b-button v-b-toggle.intolerances-collapse variant="link" class="text-custom">Intolerances</b-button>
        <b-collapse id="intolerances-collapse">
          <div class="form-check" v-for="option in intolerancesOptions" :key="option.value">
            <input class="form-check-input" type="checkbox" :value="option.value" v-model="selectedFilters.intolerances" :id="'intolerance-' + option.value">
            <label class="form-check-label text-custom" :for="'intolerance-' + option.value">{{ option.text }}</label>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetRecipesPreview2, mockGetSearchResults ,getSearch} from "../services/recipes.js";
import { cuisines, diets, intolerances } from '../assets/filterOptions';

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
      dietOptions: diets,
      cuisineOptions: cuisines,
      intolerancesOptions: intolerances,
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
    async onSearch() {
      try {
        const amountToFetch = this.resultsPerPage; // Set this to how many recipes you want to fetch
        const dietString = this.selectedFilters.diet.join(',');
        const cuisineString = this.selectedFilters.cuisine.join(',');
        const intolerancesString = this.selectedFilters.intolerances.join(',');
        console.log("Query:", this.query);
        console.log("Results Per Page:", this.resultsPerPage);
        console.log("Diet:", dietString);
        console.log("Cuisine:", cuisineString);
        console.log("Intolerances:", intolerancesString);
        console.log("searching...");

        // Calling the real getSearch function
        const result =await getSearch(this.query, amountToFetch, dietString, cuisineString, intolerancesString)
      .then(recipes => {
        console.log("Fetched recipes:", recipes);
        this.results = recipes;
        console.log(this.results);
        this.sortResults(); // Sort the results after fetching
        this.saveState(); // Save state after fetching and sorting
        console.log("im here!!!!!!!!!!!")
      })
    .catch(error => {
      console.log("nothing here ")
      this.results=[]
      console.error("Error fetching recipes:", error);
    });
    } catch (error) {
      console.log("errororrorororororor")
      console.error("Unexpected error:", error);
    }
    // mockGetSearchResults(this.query, amountToFetch, dietString, cuisineString, intolerancesString);
    // const response = mockGetRecipesPreview2(amountToFetch);
    },
    onSortChange() {
      console.log("Sort option changed:", this.sortBy);
      this.sortResults();
      this.saveState();
    },
    sortResults() {
      if (this.sortBy === "likes") {
        this.results.sort((a, b) => b.aggregateLikes - a.aggregateLikes);
      } else if (this.sortBy === "time") {
        this.results.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      }
    }
  },
  watch: {
    selectedFilters: {
      handler() {
        this.saveState();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.title {
  margin-top: 20px;
  text-align: center;
}
.navbar {
  margin-top: 20px;
}
.main-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.results {
  flex: 1;
  margin-right: 20px;
}
.filters {
  flex-basis: 300px;
}
.input-group > .form-control {
  flex: 1;
}
.input-group > .btn, .input-group > .b-form-select {
  flex: 0 0 auto;
}
.d-flex .form-control {
  flex-grow: 1;
}
.d-flex .form-control:not(:last-child) {
  margin-right: 10px;
}
.text-custom {
  color: #fc5400; /* Custom color for filter text */
}
.recipePreview {
  margin-bottom: 20px;
}
</style>
