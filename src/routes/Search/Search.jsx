import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Search.css';
import Loading from '../../components/Loading/Loading';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get('q');

    const getSearchMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
    };

    useEffect(() => {
        const searchUrlWhithQuery = `${searchUrl}?api_key=${apiKey}&query=${query}`;
        getSearchMovies(searchUrlWhithQuery);
    }, [query]);

    return (
        <div className="searchContainer">
            <h1>
                Resultados para: <span className="query">{query}</span>
            </h1>
            <div className="moviesContainer">
                {movies.length === 0 && (
                    <Loading />
                )}
                {movies.length > 0 &&
                    movies.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
            </div>
        </div>
    );
};

export default Search;
