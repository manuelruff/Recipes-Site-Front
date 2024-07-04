// src/services/user.js


import axios from 'axios';

// Create an Axios instance with specific options
const axiosInstance = axios.create({
  baseURL: 'http://localhost:80', // Replace with your API base URL
  withCredentials: true, // Ensure cookies are sent with requests if needed
});

// Function to fetch last viewed recipes
export async function getLastViewed() {
  try {
    const response = await axiosInstance.get('/users/lastview');
    let recipes = response.data;

    // Log success message
    console.log('Successfully fetched last viewed recipes:', recipes);

    return { data: { recipes } };
  } catch (error) {
    // Log the error and rethrow it for further handling
    console.error('Error fetching last viewed recipes:', error);
    throw error;
  }
}



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
  