<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1> -->
    <div class="row">
      <!-- Left side for random recipes -->
      <div class="col-md-6">
        <RecipePreviewList
          ref="recipeList"
          title="Explore these recipes"
          :displayCount=3
          :randomize="true"
          class="RandomRecipes center"
          :recipes="recipes"
        />
        <b-button @click="randomizeRecipes" class="mb-3">Randomize Recipes</b-button>
      </div>
      <div class="col-md-6">
        <div v-if="$root.store.username">
          <RecipePreviewList
            ref="recipeList_lastViewed"
            title="Last Viewed Recipes"
            :displayCount=3
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true
            }"
            :disabled="!$root.store.username"
            :recipes="lastViewedRecipes"
          />
        </div>
        <div v-else>
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginForm from "../components/LoginForm";
import { mockGetRecipesPreview2,getRandom } from "../services/recipes.js";
import { getLastViewed } from "../services/user.js";

export default {
  name: "MainPage",
  components: {
    RecipePreviewList,
    LoginForm
  },
  data() {
    return {
      recipes: [],
      lastViewedRecipes: []
    };
  },
  async mounted() {
    await this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      try {
        const amountToFetch = 3; // Set this to how many recipes you want to fetch

        const response = mockGetRecipesPreview2(amountToFetch);
        // const response = await getRandom(amountToFetch); 

        this.recipes = response.data.recipes;
        this.recipes = recipes;

        const lastViewedResponse = mockGetRecipesPreview2(amountToFetch);
        // const lastViewedResponse = await getLastViewed(); 

        console.log(lastViewedResponse);
        const lastViewed = lastViewedResponse.data.recipes;
        this.lastViewedRecipes = lastViewed;
        this.$refs.recipeList.randomizeRecipes();
    } catch (error) {
        console.error('Error fetching random recipes:', error);
    }

    },
    randomizeRecipes() {
      this.$refs.recipeList.randomizeRecipes();
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); 
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

</style>
