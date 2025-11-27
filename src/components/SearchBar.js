import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchCity, setSearchCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchCity.trim()) {
            onSearch(searchCity);
            setSearchCity('');
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter city name..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
}

export default SearchBar;