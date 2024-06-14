import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_full_view2 from "../assets/mocks/recipe_full_view2.json";
import recipe_preview2 from "../assets/mocks/recipe_preview2.json";
import family_full_recipes from "../assets/mocks/Family_recipes_full_view.json";

export function mockGetRecipesPreview(amount = 1) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(recipe_preview);
  }

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  return {
    status: 200,
    data: { recipe: recipe_full_view }
  };
}

export function mockGetRecipesPreview2(amount = 1) {
  if (amount > 8) {
    amount = 8;
  }
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(recipe_preview2[i]);
  }
  return { data: { recipes: recipes } };
}

export function mockGetRecipesPreviewFromJson(json) {
  let recipes = [];
  for (let i = 0; i < json.data.recipes.length; i++) {
    recipes.push(json.data.recipes[i]);
  }
  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails2(recipeId) {
  const recipe = recipe_full_view2.find(r => r.id === recipeId);
  return {
    status: recipe ? 200 : 404,
    data: { recipe: recipe || null }
  };
}

export function mockGetSearchResults(query, amount = 1, diet = [], cuisine = [], intolerances = []) {
  return {
    status: 200,
    data: { recipes: [recipe_preview, recipe_preview2] }
  };
}

export function mockGetFavoriteRecipes(userId, amount = 1) {
  return mockGetRecipesPreview2(amount);
}

export function mockGetRecipeFamilyFullDetails(recipeId) {
  const recipe = family_full_recipes.find(r => r.id === recipeId);
  return {
    status: recipe ? 200 : 404,
    data: { recipe: recipe || null }
  };
}

export function mockGetFamilyRecipesPreview(amount = 1) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(family_full_recipes[i]);
  }
  return { data: { recipes: recipes } };
}

export function mockGetAllFamilyRecipes() {
  const recipes = family_full_recipes.map(recipe => {
    const _instructions = recipe.analyzedInstructions
      .map(fstep => fstep.steps.map(step => ({ ...step, step: fstep.name + step.step })))
      .flat();
    return {
      ...recipe,
      _instructions
    };
  });
  return { data: { recipes } };
}



export function mockGetRecipeById(recipeId) {
  const recipe = family_full_recipes.find(r => r.id === recipeId);
  return {
    status: recipe ? 200 : 404,
    data: { recipe: recipe || null }
  };
}