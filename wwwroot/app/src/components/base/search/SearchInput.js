import React from 'react';
import SearchIcon from '../icons/SearchIcon';

const SearchInput = (props) => {
    return (
        <div className="pes-search">
            <input
                type="text"
                className="pes-search__input" />
            <SearchIcon />
        </div>
    );
};

export default SearchInput;