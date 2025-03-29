import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const MovieCard = ({ movie, }) => {
  if (!movie) {
    return <p className="text-center text-red-500">Movie data is missing!</p>;
  }

  const {id} = useParams(movie)

   const BASE_URL =  "http://www.omdbapi.com/?apikey=855a7843"
  
      // Fetch movie details function
      useEffect(() => {
          const fetchMovieDetails = async () => {
              try {
                  setLoading(true);
                  const response = await fetch(`${BASE_URL}&i=${id}&plot=full`);
                  const data = await response.json();
                  
                  if (data.Response === "True") {
                      setMovie(data);
                  } else {
                      setError(data.Error || "Movie not found");
                  }
              } catch (err) {
                  setError("Failed to fetch data");
              } finally {
                  setLoading(false);
              }
          };
  
          fetchMovieDetails();
      }, [id]);


  return (
      <div className= "bg-gray-900 text-white shadow-lg rounded-4xl p-4 transition-transform transform hover:scale-105">
      <Link to={`/movies/${movie.id}`}>
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-40 h-40 object-cover rounded-lg"
        />
        <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
        <p className="text-gray-400">{movie.year}</p>
        <button className="text-white"> Watch Trailer </button>
        <button className="text-white">Play</button>
        <button className="text-white bg-blue-900">Add to Watchlist</button>
      </Link>
      </div>
    
  );
};

export default MovieCard;