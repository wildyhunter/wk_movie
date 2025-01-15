import { useState } from 'react';
import { FilterContext } from './FilterContext';
import { yearsMapping } from '../constants/yearsMapping';
import CategoriesMovies from '../Apis/CategoriesMovies';

import PropTypes from 'prop-types';

export const FilterProvider = ({ children }) => {
    const buttons = ['Top10', 'All', 'New'];
    const categories = [
        'Category',
        ...CategoriesMovies().map((category) => category.name),
    ];
    const years = yearsMapping();

    const [selected, setSelected] = useState(0);
    const [categorySelected, setCategorySelected] = useState('');
    const [yearSelected, setYearSelected] = useState('');
 
    return (
        <FilterContext.Provider
            value={{
                buttons,
                categories,
                years,
                selected,
                setSelected,
                categorySelected,
                setCategorySelected,
                yearSelected,
                setYearSelected,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
