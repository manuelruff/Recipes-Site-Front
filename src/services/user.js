// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


  export function mockAddFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  
  export function mockRemoveFavorite(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  }
  
  export function mockAddUserRecipe(recipeDetails) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };

  }
  
  export function mockAddLastViewedRecipe(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to Last viewed Recipes", success: true}} };

  }

    
  export function mockAddToMeal(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully added to meal", success: true}} };

  }
  export function mockRemoveFromMeal(recipeId) {
    return { status: 200, response: { data: { message: "The Recipe successfully removed from meal", success: true}} };

  }
  