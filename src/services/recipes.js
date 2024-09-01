import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import recipe_full_view2 from "../assets/mocks/recipe_full_view2.json";
import recipe_preview2 from "../assets/mocks/recipe_preview2.json";
import family_full_recipes from "../assets/mocks/Family_recipes_full_view.json";
import analyzedInstructions324694 from "../assets/mocks/analyzedInstructions324694.json";
import recipeInformation324694 from "../assets/mocks/GetRecipeInformation324694.json";
import recipe_prepare_full from "../assets/mocks/recipe_prepare_full.json";

import axios from 'axios';
export async function getRandom(amount = 3) {
  console.log('Fetching random recipes with amount:', amount);
  try {
    const response = await axios.get('/recipes/random', {
      params: {
        number: amount
      }
    });
    let recipes = response.data;
    return {status:200, data: { recipes } };
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw error;
  }
}

export async function getFullView(recipeID) {
  console.log('Fetching recipe with ID:', recipeID);
  try {
    const response = await axios.get(`/recipes/${recipeID}`);
    let recipe = response.data;
    return {
      status: response.status,
      data: { recipe }
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return {
      status: error.response.status || 500, // Use 500 if no status code available
      data: null
    };
  }
}

export async function getSearch(query, amountToFetch, dietString, cuisineString, intolerancesString) {
  try {
    const response = await axios.get(`/recipes/search`, {
      params: {
        recipeName: query,
        number: amountToFetch,
        diet: dietString,
        cuisine: cuisineString,
        intolerance: intolerancesString
      }
    });
    
    if (response.status === 200) {
      // Successfully fetched the data
      return response.data; // Directly returning the data if status is 200
    } else {
      // Throw an error if the response status is not 200
      throw new Error(`Failed to fetch recipes: Server responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    throw error; // Re-throwing the error to be handled by the caller
  }
}



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
  return {status:200, data: { recipes: recipes } };
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

export function mockGetFamilyRecipesPreview(amount = 1) {
  let recipes = [];
  for (let i = 0; i < amount; i++) {
    recipes.push(family_full_recipes[i]);
  }
  return { data: { recipes: recipes } };
}


export function mockGetFamilyRecipeById(recipeId) {
  const recipe = family_full_recipes.find(r => r.id === recipeId);
  return {
    status: recipe ? 200 : 404,
    data: { recipe: recipe || null }
  };
}

export function mockGetAnalyzedInstructionsID324694() {
  return {
    status: 200,
    data: analyzedInstructions324694
  };
}

export function mockGetRecipeInformationID324694() {
  return {
    status: 200,
    data: recipeInformation324694
  };
}

export function mockGetMealRecipesPreview() {
  let recipes = [];
  for (let i = 0; i < recipe_prepare_full.length; i++) {
    recipes.push(recipe_prepare_full[i]);
  }
  return { data: { recipes: recipes } };
}
