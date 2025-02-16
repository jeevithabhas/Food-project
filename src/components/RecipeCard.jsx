import { Link } from "react-router-dom";
import { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative border rounded-xl shadow-lg overflow-hidden bg-white/50 backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:rotate-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Recipe Image with Animated Overlay */}
      <div className="relative group overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
        />

        {/* Floating Badge - Appears on Hover */}
        {isHovered && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
            ⭐ Must Try!
          </div>
        )}

        {/* Gradient Overlay with Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 transition-all duration-500"></div>

        {/* Auto-Scrolling Title for Long Names */}
        <h2
          className={`absolute bottom-4 left-4 text-xl font-bold text-white whitespace-nowrap overflow-hidden transition-all duration-500 ${
            isHovered ? "bottom-10 animate-marquee" : "bottom-4"
          }`}
        >
          {recipe.title}
        </h2>
      </div>

      {/* Floating "View Recipe" Button - Animated */}
      <div className="flex justify-center mt-4">
        <Link
          to={`/recipe/${recipe.id}`}
          className="relative flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:from-indigo-600 hover:to-blue-500"
        >
          <span className="transition-transform duration-500 hover:rotate-[360deg]">🍽️</span>
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
