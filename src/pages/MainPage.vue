<template>
  <div class="container">
    <!-- <h1 class="title">Main Page</h1> -->
    <div class="row">
      <!-- Left side for random recipes -->
      <div class="col-md-6">
        <RecipePreviewList ref="recipeList" title="Explore these recipes" class="RandomRecipes center" />
        <b-button @click="randomizeRecipes" class="mb-3">Randomize Recipes</b-button>
        </div>
      <div class="col-md-6">
        <div v-if="$root.store.username">
          <RecipePreviewList 
          ref="recipeList"
            title="Last Viewed Recipes"
            :class="{
              RandomRecipes: true,
              blur: !$root.store.username,
              center: true
            }"
            :disabled="!$root.store.username"
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

export default {
  name: "MainPage",
  components: {
    RecipePreviewList,
    LoginForm
  },
  methods: {
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
