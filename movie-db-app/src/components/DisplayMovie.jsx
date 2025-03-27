import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const DisplayMovie = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const BASE_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=855a7843";

    // Fetch movies function
   useEffect (() => {
    const fetchMovies = async () => {
        const response = await fetch (`${BASE_URL}&s=${search}`);
        const  movie = await response.json();
        if (movie.Response === "True") {
            setMovies(movie.Search || []);
            setError(null);
        } else {
            setMovies([]);
            setError(movie.Error);  
        }
    };
    fetchMovies();
    }, [search]);

    // Handle Search Input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Handle Search Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setMovies();
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4">
                <label htmlFor='search' className="block text-lg font-bold text-purple-700 rounded-full">Search Movie:</label>
                <input 
                    type='text' 
                    value={search} 
                    onChange={handleSearch}
                    placeholder="Enter movie name..." 
                    className="border text-white p-2 rounded-full"
                />
                <button type='submit' className="bg-purple-700 text-white px-4 py-2 mt-2 rounded-full">Search</button>
            </form>

            {/* Show loading message */}
            {loading && <p>Loading...</p>}

            {/* Show error message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Display movies */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {movies.length === 0 ? (
                    <p>No movies found</p>
                ) : (
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={{
                            id: movie.imdbID,
                            title: movie.Title,
                            year: movie.Year,
                            poster: movie.Poster
                        }} />
                    ))
                )}
            </div>
        </div>
    );
};

export default DisplayMovie;