import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const BASE_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=855a7843";

    // Fetch movie details function 
    useEffect (() => {
        const fetchMovies = async () => {
            const movies = await fetch (`${BASE_URL}&i=${id}`);
            const movie = await movies.json();
           setMovie(movie);
    }
    fetchMovies();
    }) [id];
    // Ensure movie exists before rendering
    if (loading) {
        return <p className="text-center text-purple-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

  return (
    <div>
      <div>
        <h1 className='text-2xl font-bold'>Movie Details:</h1>
        <h2>{movie.title}</h2>
        <img src={movie.poster} alt={movie.title} />
        <p>Movie ID: {id}</p>
        <p>{movie.year}</p>
        <p>{movie.plot}</p>
        <p>{movie.rating}</p>
        
      </div>
    </div>
  )
}

export default MovieDetails