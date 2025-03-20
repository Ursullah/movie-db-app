import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // Ensure movie exists before rendering
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
      {/* Clickable Image Links to Movie Details */}
      <Link to={`/movies/${movie.id}`}>
        <img
          src={movie.poster || "https://via.placeholder.com/200"} // Fallback image
          alt={movie.title}
          className="w-full h-60 object-cover rounded-lg"
        />
      </Link>

      <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
      <p className="text-gray-600">{movie.year}</p>
    </div>
  );
};

export default MovieCard;
