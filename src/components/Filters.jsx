import React from "react";

const FilterComponent = ({ 
  buttons, 
  categories, 
  years, 
  selected, 
  setSelected, 
  categorySelected, 
  setCategorySelected, 
  yearSelected, 
  setYearSelected 
}) => {

  const selectedStyle = {
    backgroundColor: '#FC6B01',
    color: '#000',
    border: 'none',
  };

  const defaultStyle = {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    border: 'none',
  };

  return (
    <section className="filterContainer">
      <div className="filter">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => {
              setSelected(index);
              setCategorySelected('');
              setYearSelected('');
            }}
            className={selected === index ? 'selected' : ''}
            style={{
              backgroundColor: selected === index ? '#FC6B01' : '#2c2c2c',
              color: selected === index ? '#000' : '#fff',
            }}
          >
            {btn}
          </button>
        ))}

        <select
          name="category"
          id="category"
          value={categorySelected}
          onChange={(e) => {
            setCategorySelected(e.target.value);
            setSelected(null);
            setYearSelected(null);
          }}
          style={categorySelected ? selectedStyle : defaultStyle}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filterYear filter">
        <select
          name="year"
          id="year"
          value={yearSelected}
          onChange={(e) => {
            setYearSelected(e.target.value);
            setSelected(null);
            setCategorySelected(null);
          }}
          style={yearSelected ? selectedStyle : defaultStyle}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default FilterComponent;


import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MovieCard from "../components/MovieCard.jsx";
import FilterComponent from "../components/FilterComponent.jsx"; // Importe o filtro
import "./Home.css";

const movieUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY || "API_KEY_NÃO_CARREGADA";
const buttons = ["Top10", "All", "New"];
const categories = ["Category", "Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
const years = ["2024", "2023", "2022", "2021", "2020"];

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [selected, setSelected] = useState(0);
  const [categorySelected, setCategorySelected] = useState("");
  const [yearSelected, setYearSelected] = useState("");

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results.slice(0, 10));
  };

  useEffect(() => {
    const topRateUrl = `${movieUrl}popular?${apiKey}`;
    getTopRatedMovies(topRateUrl);
  }, []);

  return (
    <div className="homeContainer">
      <div className="title">
        <h1>Movie ranking TOP 10</h1>
      </div>

      {/* Adiciona o componente de filtro global */}
      <FilterComponent
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

      <div className="moviesContainer">
        {topMovies.length === 0 && (
          <div className="loading...">
            <p>Carregando...</p>
            <AiOutlineLoading3Quarters />
          </div>
        )}
        {topMovies.length > 0 &&
          topMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Home;
