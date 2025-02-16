import { useState, useEffect, useRef } from "react";
import { fetchRecipes } from "../api";
import RecipeCard from "../components/RecipeCard";

const categories = [
  { label: "🥦 Veg", query: "vegetarian" },
  { label: "🍗 Non-Veg", query: "chicken" },
  { label: "🍰 Desserts", query: "dessert" },
];

const foodQuotes = [
  "People who love to eat are always the best people. – Julia Child",
  "Cooking is an art, but all art requires knowing something about the techniques and materials. – Nathan Myhrvold",
  "One cannot think well, love well, sleep well, if one has not dined well. – Virginia Woolf",
  "The secret ingredient is always love. ❤️",
  "You don't need a silver fork to eat good food. – Paul Prudhomme",
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("vegetarian");
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchData = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchRecipes(searchQuery);
      setRecipes(response.data || []);
      setSuggestions(response.data?.map((r) => r.title) || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes.");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 1);
    if (value.length > 1) fetchData(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    fetchData(suggestion);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 🍽️ Food Quote */}
      <div className="text-center bg-yellow-100 p-4 rounded-lg shadow-md mb-4 text-lg italic">
        <p className="text-gray-700">
          🍽️ {foodQuotes[Math.floor(Math.random() * foodQuotes.length)]} 🍽️
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
          {/* Search Icon */}
          <span className="absolute left-4 text-gray-500 text-xl">🔍</span>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={handleSearch}
            className="pl-12 pr-12 py-3 w-full text-lg focus:outline-none"
          />

          {/* Clear Button */}
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setShowSuggestions(false);
                fetchData(selectedCategory);
              }}
              className="absolute right-4 text-gray-600 hover:text-red-500 transition-all"
            >
              ✖
            </button>
          )}
        </div>

        {/* 🔽 Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-200 shadow-lg mt-1 rounded-lg max-h-40 overflow-y-auto">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 cursor-pointer hover:bg-gray-100 transition-all"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔥 Category Buttons */}
      <div className="flex justify-center space-x-4 my-4">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => {
              setSelectedCategory(cat.query);
              fetchData(cat.query);
            }}
            className={`px-5 py-2 rounded-lg text-white font-semibold transition-all transform hover:scale-105
              ${
                selectedCategory === cat.query
                  ? "bg-green-600 scale-110 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-500"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 🌟 Recipe of the Day */}
      {recipes.length > 0 && !loading && (
        <div className="bg-orange-100 p-6 rounded-lg shadow-md mb-6 text-center border border-orange-300">
          <h2 className="text-2xl font-bold text-orange-700">🌟 Recipe of the Day 🌟</h2>
          <p className="text-gray-800 italic text-lg mt-2">
            {recipes.length > 1 ? (
              <span
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() =>
                  window.location.href = `/recipe/${recipes[Math.floor(Math.random() * recipes.length)].id}`
                }
              >
                {recipes[Math.floor(Math.random() * recipes.length)].title}
              </span>
            ) : (
              recipes[0]?.title || "Loading..."
            )}
          </p>
        </div>
      )}

      {/* 📌 Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-lg"></div>
          ))
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="transform transition-transform hover:scale-105">
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            {error || "No recipes found."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
