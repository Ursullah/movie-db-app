import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = "8553a7843"

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieDetails();
    },[id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}}&i=${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch movie details");
            }
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error(error);
        }
    }


    if (!movie) {
        return <p className="text-center text-purple-500">Movie not found!</p>;
    }

    return (
        <div className="p-6 bg-purple-400 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-md">
                <h2 className='text-xl font-semibold mb-4 text-center'>{movie.Title}</h2>
                <img 
                    className='w-full h-auto object-cover rounded-lg'
                    src={movie.Poster || "/assets/MovieCard_Placeholder.jpg"} 
                    alt={movie.Title} 
                />
                <p className="mt-2 text-gray-700"><strong>Year:</strong> {movie.Year}</p>
                <p className="mt-2 text-gray-700"><strong>IMDB ID:</strong> {movie.imdbID}</p>
                <p className="mt-2 text-gray-700"><strong>Plot:</strong> {movie.Plot || "No plot available."}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
