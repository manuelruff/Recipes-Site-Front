// src/services/user.js
import axios from 'axios';

  // Function to register a new recipe for user
  export async function PostMyRecipe(newRecipe) {
    console.log(newRecipe);
    try {
      const response = await axios.post('/users/myrecipes', {
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
        return { status:200, message: "Recipe added successfully" };
      } else {
        throw new Error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error adding new recipe:', error);
      throw error;
    }
  }

  // Function to fetch my recipes for user
  export async function getMyRecipe() {
    try {
      const response = await axios.get('/users/myrecipes');
      let recipes = response.data;
      return { data: { recipes }, status:200 };
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error('Error fetching my recipes:', error);
      throw error;
    }
  }
  export async function getFullViewMyRecipe(recipeID) {
    console.log('Fetching recipe with ID:', recipeID);
    try {
      const response = await axios.get(`/users/myrecipes/${recipeID}`);
      const recipe = response.data; // Assuming response.data contains the recipe details directly
      console.log('Fetched recipe:', recipe);
      return {
        status: response.status,
        data: recipe // Adjust this according to how the backend sends data
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
      const response = await axios.get('/users/lastview');
      let recipes = response.data; // Assuming response.data directly contains the array of recipes
      return { data: { recipes }, status:200 };
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error('Error fetching last viewed recipes:', error);
      throw error;
    }
  }

  // Function to post last viewed recipes
  export async function PostLastViewed(recipeId) {
    try {
      const response = await axios.post('/users/lastview', {
        recipeId: recipeId
      });
      if (response.status === 200) {
        return {status:200, message: "Recipe added successfully to last viewed" };
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

  export async function checkFavoriteAndViewed(recipe_id) {
    try {
        const response = await axios.get('/users/FavoriteAndViewed');
        if (response.status === 200) {
            // they dont return the same from server bevcause favoriteRecipes is used in another place and lastViewedRecipes is just here
            const favoriteRecipes = response.data.favoriteRecipes.map(recipe => recipe.recipe_id);
            const lastViewedRecipes = response.data.lastViewedRecipes;
            // Ensure recipe_id is treated as a number for comparison
            const numericRecipeId = Number(recipe_id);
            const isFavorite = favoriteRecipes.includes(numericRecipeId);
            const isViewed = lastViewedRecipes.includes(numericRecipeId);
            return { isFavorite, isViewed };
        } else {
            throw new Error('Failed to fetch favorite and viewed recipes');
        }
    } catch (error) {
        console.error('Error fetching favorite and viewed recipes:', error);
        throw error;
    }
  }

  // Function to fetch favorite recipes
  export async function getFavorites() {
    try {
      const response = await axios.get('/users/favorites');
      let recipes = response.data;
      return {status:200, data: { recipes } };
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error('Error fetching last viewed recipes:', error);
      throw error;
    }
  }

  // Function to post favorite recipes
  export async function PostFavorite(recipeId) {
    try {
      const response = await axios.post('/users/favorites', {
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
      const response = await axios.delete('/users/favorites', {
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

  // Function to post recipe to meal
  export async function PostMeal(recipeId) {
    try {
      const response = await axios.post('/users/meals', {
        recipeId: recipeId
      });
      if (response.status === 200) {
        return {status:200, message: "Recipe added successfully to meal" };
      } 
    }
    catch (error) {
      if (response.status === 409){
        throw { status: 409, response: { data: { message: "alrady in", success: false } } };    }
      else {
        // Log the error and rethrow it for further handling
        console.error('Error fetching meals recipes:', error);
        throw error;
      }
    }
  }

  // Function to fetch meal 
  export async function getMeals() {
    try {
      const response = await axios.get('/users/meals');
      let recipes = response.data;
      return {status:200, data: { recipes } };
    } catch (error) {
      // Log the error and rethrow it for further handling
      console.error('Error fetching meals recipes:', error);
      throw error;
    }
  }

  // Function to delete a recipe from meal
  export async function DeleteMeal(recipeId=null) {
    try {
      let response;
      if (!recipeId) {
        // Remove all meals for the user
        response=await axios.delete('/users/meals');
      }
      else{
        // Remove a specific meal
        response = await axios.delete('/users/meals', {
          data: { recipeId: recipeId } // Corrected: Use 'data' instead of directly passing recipeId
        });
      }
      if (response.status === 200) {
        return { message: "Recipe deleted successfully from meals", status: 200};
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
  