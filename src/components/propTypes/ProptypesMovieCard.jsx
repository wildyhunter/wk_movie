import Prototypes from 'prop-types';

export const  MovieCardPrototypes = Prototypes.shape({
        title: Prototypes.string,
        poster_path: Prototypes.string,
        vote_average: Prototypes.number,
        id: Prototypes.number
    })