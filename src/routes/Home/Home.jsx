import { useState, useEffect } from 'react';

import MovieCard from '../../components/MovieCard/MovieCard.jsx';
import Loading from '../../components/Loading/Loading.jsx';

import './Home.css';

const movieUrl = import.meta.env.VITE_TOP10;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopRatedMovies = async (url) => {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            if(data && Array.isArray(data.results)) {
                setTopMovies(data.results.slice(0, 10));
            
            } else {
                console.error('Dados inválidos:', data);
                setTopMovies([]);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
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
                    <Loading />
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
