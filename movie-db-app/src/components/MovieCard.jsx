import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-4xl p-4 transition-transform transform hover:scale-105">
    <Link to={`/movies/${movie.imdbID}`} className="block">
      <div className="bg-white shadow-lg rounded-4xl p-4 transition-transform transform hover:scale-105">
        <img
          src={movie.Poster || "/assets/MovieCard_Placeholder.jpg"} // Fallback image
          alt={movie.Title}
          className="w-60 h-60 object-cover rounded-lg"
        />
        <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
        <p className="text-gray-600">{movie.Year}</p>
      </div>
    </Link>
    </div>
  );
};

export default MovieCard;
