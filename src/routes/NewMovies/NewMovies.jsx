import { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';

import './NewMovies.css';

const yearURL = import.meta.env.VITE_YEAR;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const anoAtual = new Date().getFullYear();

const NewMovies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    const getYearmovies = async (url) => {
        
        try {
            const res = await fetch(url);
            if (!res) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            if (data && Array.isArray(data.results)) {
                setMovies(data.results);
            } else {
                console.error('Dados inválidos:', data);
                setMovies([]);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            setMovies([]);
        }
    };

    useEffect(() => {
        const newMoviesUrl = `${yearURL}?api_key=${apiKey}&primary_release_year=${anoAtual}&page=${page}&sort_by=popularity.casc`;
        getYearmovies(newMoviesUrl);
    }, [page]);

    return (
        <div className="NewMovieContainer">
            <h1>
                Resultados para: <span className="query">{anoAtual}</span>
            </h1>
            <div className="moviesContainer">
                {movies.length === 0 && <Loading />}
                {movies.length > 0 &&
                    movies.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
            </div>
            <div className="pageContainer">
                <button onClick={() => page >= 2 && setPage(page - 1)}>
                    <AiOutlineLeft className="arrow" />
                    Anterior
                </button>
                <div className="buttons">
                    <button className="active" onClick={() => setPage(page)}>
                        {page}
                    </button>
                    <button onClick={() => setPage(page + 1)}>
                        {page + 1}
                    </button>
                    <button onClick={() => setPage(page + 2)}>
                        {page + 2}
                    </button>
                    <button onClick={() => setPage(page + 3)}>
                        {page + 3}
                    </button>
                    <span>...</span>
                </div>
                <button onClick={() => setPage(page + 1)}>
                    Próxima
                    <AiOutlineRight className="arrow" />
                </button>
            </div>
        </div>
    );
};

export default NewMovies;
