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
    path: "   ",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
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
    path: "/myRecipe",
    name: "myRecipe",
    component: () => import("./pages/MyRecipePage"),
  },
  {
    path: "/RecipeViewPageFamily",
    name: "RecipeViewPageFamily",
    component: () => import("./pages/RecipeViewPageFamily"),
  },
];

export default routes;
