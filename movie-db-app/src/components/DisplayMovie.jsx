import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import data from '../data.json';

const DisplayMovie = () => {
    const [movies, setMovies] = useState([]); // Initialize with an empty array
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        setMovies(data.Search);
        setFilteredMovies(data.Search); // Directly set movies from imported JSON
    }, []);

    // Handle Search Input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Handle Search Submission (Filter Movies)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            setFilteredMovies(movies);
        } else {
           const results = movies.filter(movie => 
            movie.Title.toLowerCase().includes(search.toLowerCase())
           );
            setFilteredMovies(results);
    }
    };

    return (
        <div className="p-4">
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <label htmlFor='search' className="block text-lg font-bold text-purple-700">Search Movie:</label>
                <input 
                    type='text' 
                    value={search} 
                    onChange={handleSearch}
                    placeholder="Enter movie name..." 
                    className="border p-2 rounded-full"
                />
                <button type='submit' className="bg-purple-700 text-white px-4 py-2 mt-2 cursor-pointer rounded-full">Search</button>
            </form>

            {/* Display movies */}
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-8 md:grid-cols-1">
                {movies && console.log(movies)}
                { movies && movies.length === 0 ? (
                    <p className="text-center text-purple-500">No movies found</p>
                ) : (
                    movies && movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default DisplayMovie;
