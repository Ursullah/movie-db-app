import React from "react";
import { Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const MovieCard = ({ movie }) => {
  // Ensure movie exists before rendering
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  return (
    <Link to={`/movies/${movie.id}`}>
    <div className="bg-white shadow-lg rounded-4xl p-4 transition-transform transform hover:scale-105">
      {/* Clickable Image that Links to Movie Details Page */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-60 h-60 object-cover rounded-lg"
      />

      <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
      <p className="text-gray-600">{movie.year}</p>
    </div>
    </Link>
  );
};

export default MovieCard;