import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const movieIdURL = import.meta.env.VITE_MOVIEID;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';
const imageUrl = import.meta.env.VITE_IMG;

import './Movie.css';

const Movie = () => {
    const [movie, setMovie] = useState([]);

    const movieContent = useParams();
    const movieID = movieContent.id;

    const movieImg = imageUrl + movie.poster_path;
    let countries = movie.production_countries?.map((country) => country.name) || [];;
    let generos = movie.genres?.map((genero) => `${genero.name} `) || [];

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
        <div className="movieIDContainer">
            <div className="movieIDImage">
                <img src={movieImg} alt="" />
            </div>
            <div className="infoIDContainer">
                <h1>{movie.title}</h1>
                    <div className='storyContainer'>
                        <h3 className='nameInfo'>StoryLine</h3>
                        <p className='textInfo'>{movie.overview}</p>
                    </div>
                <div className="description">
                    <div>
                        <p className='nameInfo'>Rating</p>
                        <p className='textInfo'>{movie.vote_average}</p>
                    </div>
                    <div>
                        <p className='nameInfo'>Release Date</p>
                        <p className='textInfo'>{movie.release_date}</p>
                    </div>
                    <div>
                        <p className='nameInfo'>Producion Country</p>
                        <p className='textInfo'>{countries}</p>
                    </div>
                    <div>
                        <p className='nameInfo'>Original Language</p>
                        <p className='textInfo'>{movie.original_language}</p>
                    </div>
                    <div>
                        <p className='nameInfo'>Duration</p>
                        <p className='textInfo'>{movie.runtime} min</p>
                    </div>
                    <div>
                        <p className='nameInfo'>Genero</p>
                        <p className='textInfo'>{generos}</p>
                    </div>
                    <div className="companies">
                    <hr />
                        <p>Production Companies</p>
                        <div className="imgCompanies">
                            {movie.production_companies?.map((company) => (
                                <>
                                    <img
                                        key={company.id}
                                        src={imageUrl + company.logo_path}
                                        alt={company.name}></img>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
