import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const Search = (props) => {
    const onInputSearch = (event) => {
        props.search(event.target.value.trim().toLowerCase());
    };

    return (
        <div className="search">
            <input onInput={onInputSearch} placeholder={props.placeholder} />
            <SearchIcon />
        </div>
    );
};

export default Search;