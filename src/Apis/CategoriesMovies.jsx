import { useState, useEffect } from 'react';

const catUrl = import.meta.env.VITE_CAT_URL;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const CategoriesMovies = () => {
    const [categories, setCategories] = useState([]);

    const getCategoriesMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const uniqueCategories = [
                ...new Set(data.genres.map((category) => category.name)),
            ];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    };

    useEffect(() => {
        const moviesUrl = `${catUrl}list?api_key=${apiKey}&language=pt-BR`;
        getCategoriesMovies(moviesUrl);
    }, []);

    return categories;
};

export default CategoriesMovies;
