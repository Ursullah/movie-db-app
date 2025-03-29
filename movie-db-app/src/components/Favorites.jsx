import React from "react";
import MovieCard from "./MovieCard";

const Favorites = ({ favorites }) => {
    return (
        <div className="p-4 text-white">
            <h2 className="text-2xl font-bold mb-4">❤️ Your Favorite Movies</h2>
            {favorites.length === 0 ? (
                <p>No favorites added yet!</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
