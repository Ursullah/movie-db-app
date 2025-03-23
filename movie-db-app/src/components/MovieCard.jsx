import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-3xl p-4 transition-transform transform hover:scale-110 hover:shadow-2xl">
      <Link to={`/movies/${movie.imdbID}`} className="block">
        <img
          src={movie.Poster || "/assets/MovieCard_Placeholder.jpg"}
          alt={movie.Title}
          className="w-60 h-60 object-cover rounded-lg"
        />
      </Link>

      <h2 className="text-lg font-semibold mt-2 text-center">{movie.Title}</h2>
      <p className="text-gray-600 text-center">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
