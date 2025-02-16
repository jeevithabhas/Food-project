import { useEffect, useState } from "react";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Fetch favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Handle removing a favorite recipe
  const handleRemove = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back to Recipes Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-white bg-blue-500 px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-all"
      >
        <FaArrowLeft className="mr-2" /> Back to Recipes
      </button>

      {/* Animated Title */}
      <h1 className="text-4xl font-bold mb-4 text-center animate-pulse text-red-500">
        ❤️ Favorite Recipes
      </h1>

      {/* Display favorite recipes */}
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite recipes added yet. 🍽️</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <div
              key={recipe.id}
              className="border p-4 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800 dark:text-white"
            >
              {/* Recipe Image */}
              <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded-lg" />

              {/* Recipe Title */}
              <h2 className="text-xl font-bold mt-2 text-center">{recipe.title}</h2>

              {/* Remove Button */}
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => handleRemove(recipe.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center"
                >
                  <FaHeart className="mr-2" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
