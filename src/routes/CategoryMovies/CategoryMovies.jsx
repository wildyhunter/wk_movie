import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';
import CategoriesMovies from '../../Apis/CategoriesMovies';

import './CategoryMovies.css';

const categoriaUrl = import.meta.env.VITE_ALL;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const CategoryMovies = () => {
    const arrayCategoria = useParams();
    const categoria = arrayCategoria.category;

    const categoryArray= CategoriesMovies()

    const category = categoryArray.find((item) => item.name === categoria);
    const idCategoria = category?.id || category?.find(item => item.name === categoria)?.id;
    console.log(idCategoria);

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    const getCategoryMovies = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            if (data && Array.isArray(data.results)) {
                setMovies(data.results);
            } else {
                console.error('Dados inválidos:', data);
                setMovies([]);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            setMovies([]);
        }
    };

    useEffect(() => {
        const categoryUrl = `${categoriaUrl}?api_key=${apiKey}&page=${page}&with_genres=${idCategoria}&sort_by=popularity.asc`;

        getCategoryMovies(categoryUrl);
    }, [categoria, idCategoria, page]);

    console.log(movies);

    return (
        <div className="categoryContainer">
            <h1>
                Resultados para: <span className="query">{categoria}</span>
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

export default CategoryMovies;
