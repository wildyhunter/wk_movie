import './Filter.css';
import React from 'react';
import { useState } from 'react';

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

const Filter = ({
    buttons,
    categories,
    years,
    selected,
    setSelected,
    categorySelected,
    setCategorySelected,
    yearSelected,
    setYearSelected,
}) => {

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

export default Filter;
