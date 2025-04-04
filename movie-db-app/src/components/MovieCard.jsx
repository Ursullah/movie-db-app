import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, addToFavorites, isFavorite }) => {
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-xl p-4 transition-transform transform hover:scale-105">
      <Link to={`/movies/${movie.id || movie.imdbID}`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-40 h-40 object-cover rounded-lg"
        />
        <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
        <p className="text-gray-400">{movie.year}</p>
      </Link>

      {/* Add to Favorites Button */}
      {addToFavorites && !isFavorite && (
        <button 
          onClick={() => addToFavorites(movie)} 
          className="mt-2 hover:underline text-pink-600 rounded-lg"
        >
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default MovieCard;
