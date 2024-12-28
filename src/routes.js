import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
    props: true,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("./pages/FavoritePage"),
  },
  {
    path: "/myFamily",
    name: "myFamily",
    component: () => import("./pages/MyFamilyPage"),
  },
  {
    path: "/myRecipe",
    name: "myRecipe",
    component: () => import("./pages/MyRecipePage"),
  },
  {
    path: "/RecipeViewPageFamily/:recipeId",
    name: "RecipeViewPageFamily",
    component: () => import("./pages/RecipeViewPageFamily"),
    props: true,
  },
  {
    path: "/RecipeViewMyRecipe/:recipeId",
    name: "RecipeViewMyRecipe",
    component: () => import("./pages/RecipeViewMyRecipe"),
    props: true,
  },
  {
    path: "/prepare/:recipeId",
    name: "PreparePage",
    component: () => import("./pages/PreparePage"),
    props: true,
  },
  {
    path: "/meal",
    name: "MealPage",
    component: () => import("./pages/MealPage"),
    props: true,
  },
];

export default routes;
