import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const DisplayMovie = () => {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const BASE_URL = "http://www.omdbapi.com/?apikey=855a7843";

    // Fetch movies based on category
    useEffect(() => {
        const fetchMovies = async (query, setter) => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}&s=${query}`);
                const data = await response.json();
                if (data.Response === "True") {
                    setter(data.Search || []);
                } else {
                    setter([]);
                }
            } catch (err) {
                setError("Failed to fetch movies. Try again later.");
            }
            setLoading(false);
        };

        fetchMovies("Avengers", setTrending);
        fetchMovies("Batman", setTopRated);
        fetchMovies("Spider-Man", setUpcoming);
    }, []);

    // Fetch search results
    useEffect(() => {
        if (!search) return;
        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${BASE_URL}&s=${search}`);
                const data = await response.json();
                if (data.Response === "True") {
                    setTrending(data.Search || []);
                } else {
                    setTrending([]);
                    setError(data.Error);
                }
            } catch (err) {
                setError("Failed to fetch movies. Try again later.");
            }
            setLoading(false);
        };
        fetchSearchResults();
    }, [search]);

    // Handle Search Input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="p-4">
            <form onSubmit={(e) => e.preventDefault()} className="mb-4">
                <label htmlFor="search" className="block text-lg font-bold text-pink-700">
                    Search Movie:
                </label>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Enter movie name..."
                    className="border text-white p-2 rounded-full"
                />
            </form>

            {/* Show loading message */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Trending Movies */}
            <h2 className="text-xl font-bold text-white mt-4 mb-2">🔥 Trending Movies</h2>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
                {trending.length === 0 && !loading ? (
                    <p>No movies found</p>
                ) : (
                    trending.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={{
                          id: movie.imdbID,
                            title: movie.Title,
                            year: movie.Year,
                            poster: movie.Poster
                        }} />
                    ))
                )}
            </div>

            {/* Top Rated Movies */}
            <h2 className="text-xl font-bold text-white mt-4 mb-2">⭐ Top Rated</h2>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
                {topRated.length === 0 && !loading ? (
                    <p>No movies found</p>
                ) : (
                    topRated.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={{
                          id: movie.imdbID,
                            title: movie.Title,
                            year: movie.Year,
                            poster: movie.Poster
                        }} />
                    ))
                )}
            </div>

            {/* Upcoming Movies */}
            <h2 className="text-xl font-bold text-white mt-4 mb-2">🎬 Upcoming</h2>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4">
                {upcoming.length === 0 && !loading ? (
                    <p>No movies found</p>
                ) : (
                    upcoming.map((movie) => (
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
