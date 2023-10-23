import React, { useEffect, useState } from 'react';
import { movieData } from '../../movie-data';
import { majorCities, urls } from '../../Config';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Dropdown from '../../components/Dropdown';
import MovieCard from '../../components/Movie';
import SearchBar from '../../components/SearchBar';
import '../SearchPage/SearchPage.css';

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [movies, setMovies] = useState(movieData);

  const handleSearchChange = (city) => {
    setCity(city);
    if (city.length > 2) {
      console.log("Calling")
      axios.get(urls.getCitiesUrl)
        .then((response) => {
            const filteredCities = response.data.filter((cityItem) => 
            cityItem.cityName.toLowerCase().includes(city.toLowerCase()))
            setCities(filteredCities);
        })
        .catch((error) => {
          console.error('Error fetching cities:', error);
        });
    } else {
      setCities(cities);
    }
  };

  const handleClick = () => {
    setCities(majorCities)
  }

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity.cityName);
    // setCities([])
    // axios.get(urls.getMoviesUrl + `?city=${selectedCity.cityName}`)
    //   .then((response) => {
    //     setMovies(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching movies:', error);
    //   });
  };

  const handleClearSearch = () => {
    setCity('');
    setCities(cities);
  };

  return (
    <>
      <Header />
      <div className="search-container">
        <SearchBar
          placeholder="Search for a city ..."
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          onClick={handleClick}
          value={city}
        />
        <Dropdown data={cities} handleSelection={handleCitySelection}/>
        </div>
      <div className="movies-container">
        {movies.map((item) => (
          <div key={item.id} className="movie-card">
            <MovieCard
              movieName={item.name}
              imageUrl={item.imageUrl}
              cardContent={item.content}
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default SearchScreen;
