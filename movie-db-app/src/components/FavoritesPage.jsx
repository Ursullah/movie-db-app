import React, { useState } from "react";
import MovieCard from "./MovieCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]); // Assuming favorites are stored in state

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter((m) => m.imdbID !== movie.imdbID));
  };

  return (
    <div>
      <h1>Favorites</h1>
      <div className="movie-list">
        {favorites.map((movie) => (
          <MovieCard 
            key={movie.imdbID}
            movie={movie}
            isFavorite={true}
            addToFavorites={addToFavorites} 
            removeFromFavorites={removeFromFavorites} 
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
