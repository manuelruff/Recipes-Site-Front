<template>
  <div :class="['logos', { 'no-logos': !hasLogos }]">
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
  },
  computed: {
    hasLogos() {
      return this.recipe.glutenFree || this.recipe.vegetarian || this.recipe.vegan;
    }
  }
};
</script>
  
<style scoped>
.logos {
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
}

.no-logos {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}

.logo {
  width: 30px;
  height: 30px;
  margin: 0 5px;
}
</style>
