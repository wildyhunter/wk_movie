import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import MovieCard from "../../components/MovieCard/MovieCard";
import Loading from "../../components/Loading/Loading";

import "./AllMovies.css";

const allURL = import.meta.env.VITE_ALL;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

        const getAllMovies = async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
            const pages = data.total_pages;
        };
    
        useEffect(() => {
            const AllMovieURL = `${allURL}?api_key=${apiKey}&page=${page}&sort_by=primary_release_date.asc`;
            getAllMovies(AllMovieURL);
        }, [page]);

    return (
        <div className="AllContainer">
            <h1>
                Resultados para: <span className="query">All Movies</span>
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
            <div className="pageContainer">
                
                <button onClick={() => setPage(page - 1)}><AiOutlineLeft className="arrow" />Anterior</button>
                <div className="buttons">
                    <button onClick={() => setPage(page)}>{page }</button>
                    <button onClick={() => setPage(page+1)}>{page + 1}</button>
                    <button onClick={() => setPage(page+2)}>{page + 2}</button>
                    <button onClick={() => setPage(page+3)}>{page + 3}</button>
                <span>
                    ...
                </span>
                </div>
                <button onClick={() => setPage(page + 1)}>Próxima<AiOutlineRight className="arrow" /></button>
            </div>
        </div>
    );
};

export default AllMovies;
