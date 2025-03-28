import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams(); // extracts imdb id from url
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL =  "http://www.omdbapi.com/?apikey=855a7843"

    // Fetch movie details function
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}&i=${id}&plot=full`);
                const data = await response.json();
                
                if (data.Response === "True") {
                    setMovie(data);
                } else {
                    setError(data.Error || "Movie not found");
                }
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <p className="text-center text-pink-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">Movie Details</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <img 
                    src={movie.Poster} 
                    alt={movie.Title} 
                    className="w-full md:w-1/3 rounded-lg shadow-md"
                />
                <div className='text-white'>
                    <h2 className="text-xl text-pink-600 font-semibold">{movie.Title} ({movie.Year})</h2>
                    <p className="mt-2"><strong>Plot:</strong> {movie.Plot}</p>
                    <p className="mt-2"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                    <p className="mt-2"><strong>Genre:</strong> {movie.Genre}</p>
                    <p className="mt-2"><strong>Director:</strong> {movie.Director}</p>
                    <p className="mt-2"><strong>Actors:</strong> {movie.Actors}</p>
                </div>
            </div>
            <button >Watch Trailer </button>
            <button >Add to Favorites </button>
            <button >Back to Home </button>
        </div>
    );
};

export default MovieDetails;
