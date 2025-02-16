import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Navbar = ({ favoritesCount }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 p-4 text-white flex items-center justify-between shadow-lg">
      {/* Logo with animation */}
      <Link to="/" className="text-2xl font-bold flex items-center gap-2 transition-transform transform hover:scale-105">
        🍽️ <span className="tracking-wide">Recipe App</span>
      </Link>

      {/* Favorites Link with Stylish Counter */}
      <Link to="/favorites" className="relative flex items-center gap-3 text-lg hover:text-gray-200 transition-all">
        <FaHeart size={24} className="text-red-500 animate-pulse" />
        <span className="hidden sm:inline">Favorites</span>

        {/* Animated Counter */}
        {favoritesCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
            {favoritesCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
