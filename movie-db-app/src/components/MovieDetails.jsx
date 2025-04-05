import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams(); // Extracts IMDb ID from URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "https://www.omdbapi.com/";
    const API_KEY = "7c9e2542";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
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

    const handleWatchTrailer = () => {
        const trailUrl = `https://www.youtube.com/results?search_query=${movie.Title}+trailer`;
        window.open(trailUrl, "_blank");
    };

    if (loading) return <p className="text-center text-pink-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-black min-h-screen p-6">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">Movie Details</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full md:w-1/2 rounded-lg shadow-md"
                />
                <div className="text-white">
                    <h2 className="text-xl text-pink-600 font-semibold">{movie.Title} ({movie.Year})</h2>
                    <p className="mt-2"><strong>Plot:</strong> {movie.Plot}</p>
                    <p className="mt-2"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    <p className="mt-2"><strong>Genre:</strong> {movie.Genre}</p>
                    <p className="mt-2"><strong>Director:</strong> {movie.Director}</p>
                    <p className="mt-2"><strong>Actors:</strong> {movie.Actors}</p>
                    
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button
                            onClick={handleWatchTrailer}
                            className="border text-white rounded-full p-2 px-4 bg-pink-600 hover:bg-pink-700"
                        >
                            Watch Trailer
                        </button>
                        <Link
                            to="/"
                            className="text-pink-400 hover:underline"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
