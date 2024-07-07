// src/services/user.js
import axios from 'axios';

export async function PostMyRecipe(newRecipe) {
  console.log(newRecipe);
  try {
    const response = await axios.post('http://localhost:80/users/myrecipes', {
      title: newRecipe.title,
      image: newRecipe.image,
      instructions: newRecipe.instructions,
      readyInMinutes: newRecipe.readyInMinutes,
      servings: newRecipe.servings,
      glutenFree: newRecipe.glutenFree,
      vegan: newRecipe.vegan,
      vegetarian: newRecipe.vegetarian,
      ingredients: newRecipe.ingredients,
    });

    if (response.status === 200) {
      return { message: "Recipe added successfully" };
    } else {
      throw new Error('Failed to add recipe');
    }
  } catch (error) {
    console.error('Error adding new recipe:', error);
    throw error;
  }
}

// Function to fetch my recipes
export async function getMyRecipe() {
  try {
    const response = await axios.get('http://localhost:80/users/myrecipes');
    let recipes = response.data;
    return { data: { recipes } };
  } catch (error) {
    // Log the error and rethrow it for further handling
    console.error('Error fetching my recipes:', error);
    throw error;
  }
}


export async function getFullViewMyRecipe(recipeID) {
  console.log('Fetching recipe with ID:', recipeID);
  try {
    const response = await axios.get(`http://localhost:80/users/myrecipes/${recipeID}`);
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
// Function to fetch last viewed recipes
export async function getLastViewed() {
  try {
    const response = await axios.get('http://localhost:80/users/lastview');
    let recipes = response.data; // Assuming response.data directly contains the array of recipes
    return { data: { recipes } };
  } catch (error) {
    // Log the error and rethrow it for further handling
    console.error('Error fetching last viewed recipes:', error);
    throw error;
  }
}

// Function to post last viewed recipes
export async function PostLastViewed(recipeId) {
  try {
    const response = await axios.post('http://localhost:80/users/lastview', {
      recipeId: recipeId
    });
    if (response.status === 200) {
      return { message: "Recipe added successfully to last viewed" };
    } 
  }
   catch (error) {
    if (response.status === 401){
      throw { status: 401, response: { data: { message: "you need to log in first", success: false } } };    }
    else {
      // Log the error and rethrow it for further handling
      console.error('Error posting last viewed recipes:', error);
      throw error;
    }
  }
}

// Function to fetch favorite recipes
export async function getFavorites() {
  try {
    const response = await axios.get('http://localhost:80/users/favorites');
    let recipes = response.data;
    return { data: { recipes } };
  } catch (error) {
    // Log the error and rethrow it for further handling
    console.error('Error fetching last viewed recipes:', error);
    throw error;
  }
}
// Function to post favorite recipes
export async function PostFavorite(recipeId) {
  try {
    const response = await axios.post('http://localhost:80/users/favorites', {
      recipeId: recipeId
    });
    if (response.status === 200) {
      return { message: "Recipe added successfully to favorite" };
    } 
  }
   catch (error) {
    if (response.status === 401){
      throw { status: 401, response: { data: { message: "you need to log in first", success: false } } };    }
    else {
      // Log the error and rethrow it for further handling
      console.error('Error fetching last viewed recipes:', error);
      throw error;
    }
  }
}
// Function to delete a favorite recipe
export async function DeleteFavorite(recipeId) {
  try {
    const response = await axios.delete('http://localhost:80/users/favorites', {
      data: { recipeId: recipeId } // Corrected: Use 'data' instead of directly passing recipeId
    });

    if (response.status === 200) {
      return { message: "Recipe deleted successfully from favorites" };
    } else {
      // Handle other status codes if needed
      console.error('Unexpected status code:', response.status);
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw { status: 401, response: { data: { message: "You need to log in first", success: false } } };
    } else {
      // Log the error and rethrow it for further handling
      console.error('Error deleting favorite recipe:', error);
      throw error;
    }
  }
}

// Function to post last viewed recipes
export async function PostMeal(recipeId) {
  try {
    const response = await axios.post('http://localhost:80/users/meals', {
      recipeId: recipeId
    });
    if (response.status === 200) {
      return { message: "Recipe added successfully to meal" };
    } 
  }
   catch (error) {
    if (response.status === 401){
      throw { status: 401, response: { data: { message: "you need to log in first", success: false } } };    }
    else {
      // Log the error and rethrow it for further handling
      console.error('Error fetching meals recipes:', error);
      throw error;
    }
  }
}
// Function to fetch favorite recipes
export async function getMeals() {
  try {
    const response = await axios.get('http://localhost:80/users/meals');
    let recipes = response.data;
    return { data: { recipes } };
  } catch (error) {
    // Log the error and rethrow it for further handling
    console.error('Error fetching meals recipes:', error);
    throw error;
  }
}

// Function to delete a favorite recipe
export async function DeleteMeal(recipeId) {
  try {
    const response = await axios.delete('http://localhost:80/users/meals', {
      data: { recipeId: recipeId } // Corrected: Use 'data' instead of directly passing recipeId
    });

    if (response.status === 200) {
      return { message: "Recipe deleted successfully from meals" };
    } else {
      // Handle other status codes if needed
      console.error('Unexpected status code:', response.status);
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw { status: 401, response: { data: { message: "You need to log in first", success: false } } };
    } else {
      // Log the error and rethrow it for further handling
      console.error('Error deleting recipe from meal:', error);
      throw error;
    }
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
  