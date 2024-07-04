// src/services/auth.js

import axios from "axios";


export async function PostLogin(username,password) {
  try {
    const response = await axios.post('http://localhost/auth/Login', {
      username: username,
      password: password,
    });
    return response.data; // Assuming response.data contains the registered user data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}


export async function PostRegister(userDetails) {
  try {
    const response = await axios.post('http://localhost:80/auth/Register', {
      username: userDetails.username,
      password: userDetails.password,
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      country: userDetails.country,
      email: userDetails.email,
      confirmedPassword: userDetails.confirmedPassword
    });
    return response.data; // Assuming response.data contains the registered user data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function PostMyRecipe(newRecipe) {
  console.log(newRecipe)
  try {
    const response = await axios.post('http://localhost:80/users/myrecipes', {
      title: newRecipe.title,
      image :newRecipe.image,
      instructions : newRecipe.instructions,
      readyInMinutes : newRecipe.readyInMinutes,
      servings : newRecipe.servings,
      glutenFree : newRecipe.glutenFree,
      vegan : newRecipe.vegan,
      vegetarian : newRecipe.vegetarian,
      ingredients : newRecipe.ingredients,
    });
    return response.data; 
  } catch (error) {
    console.error('Error adding new recipe for user:', error);
    throw error;
  }
}


export function mockLogin(userName,password, success = true) {
  // Check if already logged in
  if (!success) {
    throw { status: 409, response: { data: { message: "A user is already logged in", success: false } } };
  }

  // If all checks pass, return a success message
  return { status: 200, response: { data: { message: "login succeeded", success: true}} };
}


export function mockRegister(userDetails, success = true) {

  if (!success) {
    throw { status: 409, response: { data: { message: "Username taken", success: false } } };
  }

  return { status: 200, response: { data: { message: "user created", success: true}} };
}


export function mockLogout() {
  return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

}


