import { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import MovieCard from '../../components/MovieCard/MovieCard.jsx';

import './Home.css';

const movieUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setTopMovies(data.results.slice(0, 10));
    };

    useEffect(() => {
        const topRateUrl = `${movieUrl}popular?api_key=${apiKey}`;
        getTopRatedMovies(topRateUrl);
    }, []);

    return (
        <div className="homeContainer">
            <h1>
                Movies ranking: <span className="query">Top10</span>
            </h1>
            <div className="moviesContainer">
                {topMovies.length === 0 && (
                    <div className="loading...">
                        <p>Carregando...</p>
                        <AiOutlineLoading3Quarters />
                    </div>
                )}
                {topMovies.length > 0 &&
                    topMovies.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
