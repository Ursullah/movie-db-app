import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, className }) => {
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  return (
    <Link to={`/movies/${movie.id}`}>
      <div
        className={`bg-white shadow-lg rounded-4xl p-4 transition-transform transform hover:scale-105 ${className}`}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-60 h-60 object-fill rounded-4xl"
        />
        <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
        <p className="text-gray-600">{movie.year}</p>
        <p className="text-gray-600">{movie.rating}</p>
      </div>
    </Link>
  );
};

export default MovieCard;