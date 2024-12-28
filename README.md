# Recipe Site Frontend

Welcome to the Recipe Site! This is the frontend for a user-friendly web application that allows users to browse, search, and manage their favorite recipes. Built with modern web technologies, the frontend offers a responsive and interactive experience.

---

## Features

- **User Authentication**: Login and register functionality.
- **Recipe Management**: Browse, search, and view recipes.
- **User Interactions**: Save favorite recipes
- **Responsive Design**: Fully functional on desktop and mobile devices.
- **Toast Notifications**: User feedback for actions (e.g., login success, errors).

---

## Technologies Used

- **Framework**: Vue.js (JavaScript Framework)
- **State Management**: Local state with Vue instance
- **Styling**: Bootstrap and Bootstrap-Vue for responsive design
- **HTTP Client**: Axios for API interactions
- **Validation**: Vuelidate for form validation
- **Routing**: Vue Router for navigation

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/manuelruff/Recipes-Site-Front
   cd Recipes-Site-Front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run serve
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## Notes on Running Without a Server

This application can run without a server by using mock functions to get data. If you want to also run the server and see results, you can switch between mock and server functions by modifying areas labeled:

- `// no server`
- `// with server`

### Functionality Without Server:
- Log in - any username and password will work here
- View family recipes.
- View details of recipes present in home.
- Randomize recipes.

### Functionality With Server:
- Recipe search functionality.

For the rest of the features, the server requires a database. If you want to explore these features, refer to the `sql_scripts` folder in the server project and build the database as described there.

The server can be found at: [Recipes-Site-Back](https://github.com/manuelruff/Recipes-Site-Back).


## Environment Variables

The project uses environment variables to configure the API base URL. Ensure the `.env` file is correctly set up:

```env
VUE_APP_URL=http://localhost:3000
```
Currently i left a .env in the project

---