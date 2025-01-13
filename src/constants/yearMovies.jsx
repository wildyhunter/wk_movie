import { useState, useEffect } from 'react';

const movieUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const useYearMovies = () => {
    const [years, setYears] = useState([]);

    const getYearMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const uniqueYears = [...new Set(data.results.map((movie) => movie.release_date.split('-')[0]))];
            setYears(uniqueYears);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    };

    useEffect(() => {
        const moviesUrl = `${movieUrl}?api_key=${apiKey}`;
        getYearMovies(moviesUrl);
      }, []);

      console.log(years);

    return years;
};

export default useYearMovies;
