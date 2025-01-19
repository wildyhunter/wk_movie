import { useState, useEffect,  } from "react";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading/Loading";

const movieIdURL = import.meta.env.VITE_MOVIEID;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';
const imageUrl = import.meta.env.VITE_IMG;

const Movie = () => {
    const [movie, setMovie] = useState([]);

    const movieContent = useParams();
    const movieID = movieContent.id;
    const movieImg = imageUrl + movie.poster_path
    
    const getMovie = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            if (data) {
                setMovie(data);
            } else {
                console.error('Dados inválidos:', data);
                setMovie([]);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            setMovie([]);
        }
    };

    useEffect(() => {
        const movieURL = `${movieIdURL}/${movieID}?api_key=${apiKey}`;
        getMovie(movieURL);
    }, [movieID]);
    console.log(movie);

    return (
        <div className="moviesContainer"><h1><img src={movieImg} alt="" /></h1>
    </div>
    );
};

export default Movie;
