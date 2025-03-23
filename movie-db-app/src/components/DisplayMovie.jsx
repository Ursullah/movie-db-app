import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const DisplayMovie = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    // Fetch movies function
    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=[855a7843]&` + new URLSearchParams({ s: search }));
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
                localStorage.setItem("movies", JSON.stringify(data.Search));
            } else {
                setMovies([]); // If no movies are found
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Load movies from local storage on component mount
    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem("movies"));
        if (storedMovies) {
            setMovies(storedMovies);
        }
    }, []);

    // Handle Search Input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Handle Search Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
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
            <div className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:grid-cols-4">
                {movies.length === 0 ? (
                    <p>No movies found</p>
                ) : (
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default DisplayMovie;