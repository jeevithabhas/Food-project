import axios from "axios";

// ✅ Updated Backend URL
const API_URL = "https://food-backend-nqiu.onrender.com/api"; 

// Fetch recipes by query
export const fetchRecipes = (query) => {
  return axios.get(`${API_URL}/recipes?query=${query}`);
};

// Fetch recipe details by ID
export const fetchRecipeDetails = (id) => {
  return axios.get(`${API_URL}/recipes/${id}`);
};

// Fetch favorite recipes
export const fetchFavorites = () => {
  return axios.get(`${API_URL}/favorites`);
};

// Add to favorites
export const addToFavorites = (recipe) => {
  return axios.post(`${API_URL}/favorites`, recipe);
};

// Remove from favorites
export const removeFromFavorites = (id) => {
  return axios.delete(`${API_URL}/favorites/${id}`);
};
