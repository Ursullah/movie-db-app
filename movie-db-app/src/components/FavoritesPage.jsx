import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage if you want it persistent
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

    // Remove movie from favorites
    const removeFromFavorites = (movie) => {
        const updatedFavorites = favorites.filter((m) => m.id !== movie.id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
        alert(`${movie.title} removed from favorites!`);
      };

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-xl font-bold text-white mt-4 mb-4">❤️ Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              removeFromFavorites={removeFromFavorites} // Pass the remove function
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;