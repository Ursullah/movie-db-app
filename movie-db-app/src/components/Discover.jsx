import React from 'react'

const Discover = () => {
    const[newMovies, setNewMovies] = useState([]);
    const[loading, setLoading] = useState(false);

    const fetchNewMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=855a7843&` + new URLSearchParams({ s: "new" }));
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            if (data.Search) {
                setNewMovies(data.Search);
            } else {
                setNewMovies([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewMovies();
    }, []);


  return (
    <div className="bg-white shadow-lg rounded-4xl p-4 transition-transform transform hover:scale-105">
    {/* Clickable Image Links to Movie Details */}
    {`/movies/${movie.id}`}
      <img
        src={movie.poster || "/assets/MovieCard_Placeholder.jpg"} // Fallback image
        alt={movie.title}
        className="w-60 h-60 object-cover rounded-lg"
      />

    <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
    <p className="text-gray-600">{movie.year}</p>
  </div>
  )
}

export default Discover;
