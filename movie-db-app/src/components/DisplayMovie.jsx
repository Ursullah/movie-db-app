import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const DisplayMovie = () => {
    const [movies, setMovies] = useState([]);
    const [topTVShows, setTopTVShows] = useState([]);
    const [topAnime, setTopAnime] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('movies'); // 'movies', 'tvshows', 'anime'

    const BASE_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=855a7843";

    // Fetch data function
    const fetchData = async (searchTerm, category) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}&s=${searchTerm}`);
            const data = await response.json();
            
            if (data.Response === "True") {
                return data.Search || [];
            } else {
                setError(data.Error);
                return [];
            }
        } catch (err) {
            setError("Failed to fetch data");
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch movies based on active tab
    useEffect(() => {
        const fetchAllData = async () => {
            if (search) {
                // If searching, search across all categories
                const results = await fetchData(search);
                setMovies(results);
            } else {
                // Default content when no search
                if (activeTab === 'movies') {
                    const movieResults = await fetchData("action");
                    setMovies(movieResults);
                } else if (activeTab === 'tvshows') {
                    const tvResults = await fetchData("breaking bad");
                    setTopTVShows(tvResults);
                } else if (activeTab === 'anime') {
                    const animeResults = await fetchData("naruto");
                    setTopAnime(animeResults);
                }
            }
        };
        
        fetchAllData();
    }, [search, activeTab]);

    // Get the movie full plot
 

    // Handle Search Input
    function handleSearch(e) {
        setSearch(e.target.value);
    }

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearch(""); // Clear search when changing tabs
    };

    return (
        <div className="p-4">
            <form className="mb-6">
                <label htmlFor='search' className="block text-lg font-bold text-pink-600 mb-2">
                    Search:
                </label>
                <input 
                    type='text' 
                    value={search} 
                    onChange={handleSearch}
                    placeholder={`Enter ${activeTab} name...`} 
                    className="border border-gray-300 text-white p-2 rounded w-full md:w-1/2"
                />
            </form>

            {/* Tabs for navigation */}
            <div className="flex mb-6 border-b border-gray-200">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'movies' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
                    onClick={() => handleTabChange('movies')}
                >
                    Movies
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'tvshows' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
                    onClick={() => handleTabChange('tvshows')}
                >
                    TV Shows
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'anime' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
                    onClick={() => handleTabChange('anime')}
                >
                    Anime
                </button>
            </div>

            {/* Show loading or error message */}
            {isLoading && <p className="text-center py-4">Loading...</p>}
            {error && !isLoading && <p className="text-red-500 py-4">{error}</p>}

            {/* Display content based on active tab */}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                    {activeTab === 'movies' && (
                        movies.length === 0 ? (
                            <p className="col-span-full text-center">No movies found</p>
                        ) : (
                            movies.map((movie) => (
                                <MovieCard 
                                    key={movie.imdbID} 
                                    movie={{
                                        id: movie.imdbID,
                                        title: movie.Title,
                                        year: movie.Year,
                                        poster: movie.Poster,
                                    }} />
                            )))
                    )}

                    {activeTab === 'tvshows' && (
                        topTVShows.length === 0 ? (
                            <p className="col-span-full text-center">No TV shows found</p>
                        ) : (
                            topTVShows.map((show) => (
                                <MovieCard 
                                    key={show.imdbID} 
                                    movie={{
                                        id: show.imdbID,
                                        title: show.Title,
                                        year: show.Year,
                                        poster: show.Poster
                                    }} 
                                />
                            ))
                        )
                    )}

                    {activeTab === 'anime' && (
                        topAnime.length === 0 ? (
                            <p className="col-span-full text-center">No anime found</p>
                        ) : (
                            topAnime.map((anime) => (
                                <MovieCard 
                                    key={anime.imdbID} 
                                    movie={{
                                        id: anime.imdbID,
                                        title: anime.Title,
                                        year: anime.Year,
                                        poster: anime.Poster
                                    }} 
                                />
                            ))
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default DisplayMovie;