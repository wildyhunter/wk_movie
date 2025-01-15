import { useState, useEffect } from 'react';

const catUrl = import.meta.env.VITE_CATEGORY;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';

const CategoriesMovies = () => {
    const [categories, setCategories] = useState([]);

    const getCategoriesMovies = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            if (data && Array.isArray(data.genres)) {
                setCategories(data.genres);
            }else {
                console.error('Dados inválidos:', data);
                setCategories([]);
            }
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
