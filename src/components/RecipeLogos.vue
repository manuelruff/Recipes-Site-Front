<template>
    <div class="logos">
      <img v-if="recipe.glutenFree" src="@/assets/pictures/gluten_free.jpg" alt="Gluten Free" class="logo" />
      <img v-if="recipe.vegetarian" src="@/assets/pictures/vegeterian.jpg" alt="Vegetarian" class="logo" />
      <img v-if="recipe.vegan" src="@/assets/pictures/vegan.png" alt="Vegan" class="logo" />
    </div>
  </template>
  
  <script>
  export default {
    name: "RecipeLogos",
    props: {
      recipe: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .logos {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .logo {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }
  </style>
  