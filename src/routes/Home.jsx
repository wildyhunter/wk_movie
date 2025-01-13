import { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import MovieCard from '../components/MovieCard.jsx';
import Filter from '../components/Filters.jsx';

import './Home.css';

const movieUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY || 'API_KEY_NÃO_CARREGADA';
const buttons = ['Top10', 'All', 'New'];
const categories = [
    'Category',
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Sci-Fi',
];
const years = ['2024', '2023', '2022', '2021', '2020'];

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [selected, setSelected] = useState(0);
    const [categorySelected, setCategorySelected] = useState('');
    const [yearSelected, setYearSelected] = useState('');

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setTopMovies(data.results.slice(0, 10));
    };

    useEffect(() => {
        const topRateUrl = `${movieUrl}popular?api_key=${apiKey}`;
        getTopRatedMovies(topRateUrl);
    }, []);

    return (
        <div className="homeContainer">
            <section className="filterContainer">
                <Filter
                    buttons={buttons}
                    categories={categories}
                    years={years}
                    selected={selected}
                    setSelected={setSelected}
                    categorySelected={categorySelected}
                    setCategorySelected={setCategorySelected}
                    yearSelected={yearSelected}
                    setYearSelected={setYearSelected}
                />
            </section>
            <div className="moviesContainer">
                {topMovies.length === 0 && (
                    <div className="loading...">
                        <p>Carregando...</p>
                        <AiOutlineLoading3Quarters />
                    </div>
                )}
                {topMovies.length > 0 &&
                    topMovies.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
            </div>
        </div>
    );
};

export default Home;
