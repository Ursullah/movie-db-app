import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data.json';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    // Load movie details on component mount
    useEffect(() => {
        const selectedMovie = data.Search.find((movie) => movie.imdbID === id);
        setMovie(selectedMovie);
    }, [id]);

    // Ensure movie exists before rendering
    if (!movie) {
        return <p className="text-center text-purple-500">Movie not found!</p>;
    }

    return (
        <div className="p-6 bg-purple-400 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-md">
                <h2 className='text-xl font-semibold mb-4'>{movie.Title}</h2>
                <img 
                    className='w-full h-auto object-cover rounded-lg'
                    src={movie.Poster} 
                    alt={movie.Title} 
                />
                <p className="mt-2 text-gray-700"><strong>Year:</strong> {movie.Year}</p>
                <p className="mt-2 text-gray-700"><strong>IMDB ID:</strong> {movie.imdbID}</p>
                <p className="mt-2 text-gray-700"><strong>Plot:</strong> {movie.Plot || "No plot available."}</p>
            </div>
        </div>
    );
}

export default MovieDetails;
