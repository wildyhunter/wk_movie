import { Link } from 'react-router-dom';
import { MovieCardPrototypes } from './propTypes/ProptypesMovieCard';
import LanguageFlag from './LanguageFlag';
import RatingStars from './ratingStars';

import PropTypes from 'prop-types';
import './MovieCard.css';

const imageUrl = import.meta.env.VITE_IMG;
const MovieCard = ({ movie, index, showLink = true }) => {
    const year = movie.release_date.split('-')[0];
    const language = movie.original_language;
    const avarage = movie.vote_average.toFixed(1);

    return (
        <div className="movieCardContainer">
            <h1 className="index">{(index + 1).toString()}</h1>
            <img
                src={imageUrl + movie.poster_path}
                alt={movie.title}
                className="movieCard__image"
            />
            <div className="infoContainer">
                <div className="info">
                    <div className="titleContainer">
                        <h2 className="title">{movie.title}</h2>
                        <p>({year})</p>
                        <p>
                            <LanguageFlag
                                languageCode={language}
                                className="flag"
                            />
                        </p>
                    </div>
                    <div className="description">
                        <p>{movie.overview}</p>
                    </div>
                    <div className="details">
                        {showLink && (
                            <Link to={`/movie/${movie.id}`}>Detalhes</Link>
                        )}
                    </div>
                </div>
                <div className="containerAvaliation">
                    <div className="avaliation">
                        <p>{avarage}/10</p></div>
                    <div>
                        <RatingStars rating={movie.vote_average} className="stars"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: MovieCardPrototypes.isRequired,
    showLink: PropTypes.bool,
    index: PropTypes.number,
};

export default MovieCard;
