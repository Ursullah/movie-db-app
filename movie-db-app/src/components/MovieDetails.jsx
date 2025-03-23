import React from 'react'

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch movie details function 
    const fetchMovie = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=[855a7843]&` + new URLSearchParams({ i: id }));
            if (!response.ok) {
                throw new Error("Failed to fetch movie");
            }
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Load movie details on component mount
    useEffect(() => {
        fetchMovie();
    }, []);

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
        <h2>{movie.title}</h2>
        <img src={movie.poster} alt={movie.title} />
        <p>{movie.year}</p>
        <p>{movie.plot}</p>
        
      </div>
    </div>
  )
}

export default MovieDetails