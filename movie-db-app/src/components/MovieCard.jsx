import React from "react";
import { Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const MovieCard = ({ movie }) => {
  // Ensure movie exists before rendering
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  return (
    
    <div className="bg-white shadow-lg rounded-4xl p-4 transition-transform transform hover:scale-105">
      {/* Clickable Image Links to Movie Details */}
        <img
          src={movie.poster || "/assets/MovieCard_Placeholder.jpg"} // Fallback image
          alt={movie.title}
          className="w-60 h-60 object-cover rounded-lg"
        />

      <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
      <p className="text-gray-600">{movie.year}</p>
    </div>
  );
  <MovieDetails />
};

export default MovieCard;