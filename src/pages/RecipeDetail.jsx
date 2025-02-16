import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRecipeDetails } from "../api"; // ✅ No unused imports

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    fetchRecipeDetails(id)
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorite(favorites.some((fav) => fav.id === id));
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorite((prev) => {
      const updatedFavorite = !prev;

      if (updatedFavorite) {
        favorites.push({ id, title: recipe.title, image: recipe.image });
      } else {
        favorites = favorites.filter((fav) => fav.id !== id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));

      return updatedFavorite;
    });
  };

  if (loading) {
    return <div className="text-center text-gray-500 text-xl">Loading recipe...</div>;
  }

  // ✅ FIX: Step-by-Step Numbered Instructions using DOMParser
  let formattedInstructions = "No instructions available.";
  if (recipe.instructions) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(recipe.instructions, "text/html");
    const steps = doc.querySelectorAll("li");

    formattedInstructions = (
      <ol className="list-decimal list-inside space-y-2">
        {Array.from(steps).map((step, index) => (
          <li key={index} className="text-lg">{step.textContent.trim()}</li>
        ))}
      </ol>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
      >
        ⬅️ Back to Recipes
      </button>

      {/* Recipe Title */}
      <h1 className="text-4xl font-bold text-center">{recipe.title}</h1>

      {/* Recipe Image */}
      <div className="relative group mt-6 rounded-lg overflow-hidden shadow-2xl">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-lg transition-all transform group-hover:scale-110 brightness-90"
        />
        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
          🍽️ A delightful dish made just for you!
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={toggleFavorite}
          className={`px-5 py-2 text-white rounded-full shadow-md transition-all ${
            favorite ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {favorite ? "❤️ Remove from Favorites" : "⭐ Add to Favorites"}
        </button>
      </div>

      {/* ✅ FIXED: Step-by-Step Instructions */}
      <h2 className="text-2xl font-bold mt-8">📖 How to Cook</h2>
      <div className="mt-4 space-y-4 text-lg">{formattedInstructions}</div>

      {/* 🍏 Nutritional Values */}
      <h2 className="text-2xl font-bold mt-8">🍏 Nutritional Info</h2>
      <div className="grid grid-cols-2 gap-4 mt-4 text-lg">
        <div className="bg-green-100 p-3 rounded-lg shadow-md">
          <strong>Calories:</strong> {recipe.nutrition?.calories} kcal
        </div>
        <div className="bg-green-100 p-3 rounded-lg shadow-md">
          <strong>Carbs:</strong> {recipe.nutrition?.carbs} g
        </div>
        <div className="bg-green-100 p-3 rounded-lg shadow-md">
          <strong>Protein:</strong> {recipe.nutrition?.protein} g
        </div>
        <div className="bg-green-100 p-3 rounded-lg shadow-md">
          <strong>Fat:</strong> {recipe.nutrition?.fat} g
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
