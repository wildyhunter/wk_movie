import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FilterContext } from '../../context/FilterContext';

import './NavBar.css';

const NavBar = () => {
    const { setSelected, setCategorySelected, setYearSelected } =
        useContext(FilterContext);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        navigate(`/search?q=${search}`);
        setSearch('');
    };

    return (
        <div className="navContainer">
            <div className="navBar">
                <h2>
                    <Link
                        to="/"
                        onClick={() => (
                            setSelected(0),
                            setSearch(''),
                            setCategorySelected(''),
                            setYearSelected('')
                        )}
                    >
                        <img id="logo" src="src\assets\logo.svg" alt="" />
                    </Link>
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Busque um filme"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button type="submit" onClick={() => setSelected(null)}>
                        <BiSearchAlt2 />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NavBar;
