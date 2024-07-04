// src/services/auth.js

import axios from "axios";



export async function PostLogin(username, password) {
  try {
    const response = await axios.post('http://localhost/auth/Login', {
      username: username,
      password: password,
    });
    // Check response status
    if (response.status === 200) {
      
      return response.data; // Assuming response.data contains the registered user data or success message
      
    } else {
      throw new Error('Failed to login');
    }

  } catch (error) {
    // Check if error is from axios or server response
    if (error.response.status === 401) {
      throw { status: 401, response: { data: { message: "incorrect username or password", success: false } } };
    } else {
      throw { status: 500, response: { data: { message: "Failed to login", success: false } } };
    }
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

    // Assuming the backend returns a success message upon successful registration
    if (response.status === 201) {
      return { message: "User created", success: true };
    } else {
      // Handle unexpected responses here
      throw { status: response.status, message: "Unexpected response from server" };
    }
  } catch (error) {
    // Handle errors from Axios or the backend
    if (error.response) {
      // The request was made and the server responded with a status code
      // Check for specific error messages or status codes from the server
      if (error.response.status === 409) {
        throw { status: 409, message: "Username taken", success: false };
      } else {
        console.error('Error registering user:', error.response.data);
        throw { status: error.response.status, message: error.response.data };
      }
    } 
    else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message);
      throw { status: 500, message: "Request setup error" };
    }
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


