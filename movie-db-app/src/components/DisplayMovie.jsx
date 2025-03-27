import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const DisplayMovie = () => {
    const [movies, setMovies] = useState([]);
    const [topTVShows, setTopTVShows] = useState([]);
    const [topAnime, setTopAnime] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const BASE_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=855a7843";

    // Fetch movies function
   useEffect (() => {
    const fetchMovies = async () => {
        const response = await fetch (`${BASE_URL}&s=${search || "movies"}`);
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

    useEffect (() => {
        const fetchTopTVShows = async () => {
            const response = await fetch (`${BASE_URL}&s=${search || "tv shows"}`);
            const  movie = await response.json();
            if (movie.Response === "True") {
                setTopTVShows(movie.Search || []);
                setError(null);
            } else {
                setTopTVShows([]);
                setError(movie.Error);  
            }
        };
        fetchTopTVShows();
        }, [search]);

        useEffect (() => {
            const fetchTopAnime = async () => {
                const response = await fetch (`${BASE_URL}&s=${search || "anime"}`);
                const  movie = await response.json();
                if (movie.Response === "True") {
                    setTopAnime(movie.Search || []);
                    setError(null);
                } else {
                    setTopAnime([]);
                    setError(movie.Error);  
                }
            };
            fetchTopAnime();
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
            <form onSubmit={handleSubmit} className="mb-4 flex-col gap 2">
                <label htmlFor='search' className="block text-lg font-bold text-pink-600 rounded-full">Search Movie:</label>
                <input 
                    type='text' 
                    value={search} 
                    onChange={handleSearch}
                    placeholder="Enter movie name..." 
                    className="border text-white p-2 rounded-full"
                />
            </form>

            {/* Show error message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Display movies */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                {movies.length === 0 ? (
                    <p>No movies found</p>
                ) : (
                    movies.map((movie, index) => (
                        <MovieCard key={movie.imdbID} movie={{
                            id: movie.imdbID,
                            title: movie.Title,
                            year: movie.Year,
                            poster: movie.Poster
                        }} className= {index === 0 ? "row-span-2" : ""} 
                        />
                    ))
                )}
            </div>
            {/* Top TV shows */}
                <h1 className='text-black font-bold text-3xl'>Trending Now🔥</h1>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                    {topTVShows.length === 0 ? (
                        <p>No TV shows found</p>
                    ) : (
                        topTVShows.map((show) => (
                            <MovieCard key={show.imdbID} movie={{
                                id: show.imdbID,
                                title: show.Title,
                                year: show.Year,
                                poster: show.Poster
                            }} />
                        ))
                    )}
                </div>
                {/* Top Anime  */}
                    <h1>Top Anime</h1>
                    <div>
                        {topAnime.length === 0 ? (
                            <p>No anime found</p>
                        ) : (
                            topAnime.map((anime) => (
                                <MovieCard key={anime.imdbID} anime= {{
                                    id : anime.imdbID,
                                    title : anime.Title,
                                    year : anime.Year,
                                    poster : anime.poster
                                }} />
                            ))
                        )}
                    </div>
        </div>
    );
};

export default DisplayMovie;