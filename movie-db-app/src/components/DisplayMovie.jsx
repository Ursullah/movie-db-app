import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
 
const API_KEY = "8553a7843";

const DisplayMovie = () => {
    const [movies, setMovies] = useState([]); 
    const [search, setSearch] = useState("");
    const[loading, setLoading] = useState(false);


    useEffect(() => {
    fetchMovies();
    },[]);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=star wars`);
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            };
            const data = await response.json();
            if (data.Search) {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Handle Search Input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    // Handle Search Submission (Filter Movies)
    const handleSubmit = (e) => {
        e.preventDefault();
      if (search === "") {
        return;
      }
    };

    return (
    <div className="p-4">
            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
                <input 
                    type='text' 
                    value={search} 
                    onChange={handleSearch}
                    placeholder="Search for a movie..." 
                    className="border p-2 rounded-full w-60"
                />
                <button type='submit' className="bg-purple-700 text-white px-4 py-2 rounded-full">Search</button>
            </form>

           {loading ? (
            <p className="text-center text-purple-500">Loading...</p>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
            )}
        </div>
    );
};

export default DisplayMovie;
