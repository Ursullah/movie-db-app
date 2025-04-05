import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "7c9e2542";

const Discover = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDiscoverMovies();
    }, []);

    const fetchDiscoverMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=trending`);
            const data = await response.json();
            setMovies(data.Search || []);
        } catch (error) {
            console.error("Error fetching discover movies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-pink-600 text-center mb-4">Discover Trending Movies</h1>
            {loading ? (
                <p className="text-center text-pink-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-8">
                    {movies.length === 0 ? (
                        <p className="text-center text-gray-500">No movies found</p>
                    ) : (
                        movies.map((movie) => <MovieCard key={movie.imdbID} movie={{
                            id: movie.imdbID,
                            title: movie.Title,
                            year: movie.Year,
                            poster : movie.Poster
                        }} />)
                    )}
                </div>
            )}
        </div>
    );
};

export default Discover;
