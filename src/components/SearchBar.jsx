import React, { useEffect, useState } from 'react';
import '../page/SearchPage/SearchPage.css';

const SearchBar = ({placeholder, onChange, onClear, onClick, value=""}) => {
    return (
        <div className="search-tool">
            <input type="text" className="search-box"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onClick={onClick}
            />
            
        {value && <span className="clear-button" onClick={onClear}>
          &#10006;
        </span>
        }
        </div>
    )
}

export default SearchBar;