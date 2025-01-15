import './Filter.css';

import { useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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

const Filter = () => {
    const {
        buttons,
        categories,
        years,
        selected,
        setSelected,
        categorySelected,
        setCategorySelected,
        yearSelected,
        setYearSelected,
    } = useContext(FilterContext);

    const navigate = useNavigate();
    const { category } = useParams();
    const { yearsmovies } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/category/')) {
            setCategorySelected(category);
        }
    }, [category, location.pathname, setCategorySelected]);

    useEffect(() => {
        if (location.pathname.startsWith('/yearmovies/')) {
            setYearSelected(yearsmovies);
        }
    }, [yearsmovies, location.pathname, setYearSelected, years]);
    
    const handleButonClick = (index) => {
        setSelected(index);
        setCategorySelected('');
        setYearSelected('');

        if (index === 0) {
            navigate('/');
        } else if (index === 1) {
            navigate('/allmovies');
        } else if (index === 2) {
            navigate('/newmovies');
        }
    };

    const handleCategoryChange = (e) => {
        setCategorySelected(e.target.value);
        setSelected('');
        setYearSelected('');
        navigate(`/category/${e.target.value}`);
    };

    const handleYearChange = (e) => {
        setYearSelected(e.target.value);
        setSelected('');
        setCategorySelected('');
        navigate(`/yearsmovies/${e.target.value}`);
    };

    return (
        <section className="filterContainer">
            <div className="filter">
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            handleButonClick(index);
                        }}
                        className={selected === index ? 'selected' : ''}
                        style={{
                            backgroundColor:
                                selected === index ? '#FC6B01' : '#2c2c2c',
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
                        handleCategoryChange(e);
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
                        handleYearChange(e);
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

export default Filter;
