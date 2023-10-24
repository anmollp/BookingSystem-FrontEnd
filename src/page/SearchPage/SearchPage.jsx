import React, { useRef, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Carousel from 'react-bootstrap/Carousel';
import '../SearchPage/SearchPage.css';
import { getCitites, getMovies } from '../../api/apiCalls';

const SearchScreen = () => {
  const majorCities = useRef([]);
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const cityResponse = getCitites();
    cityResponse.then((response) => {
      setCities(response.data);
      majorCities.current = response.data;
    }
    )
    .catch((error) => {
      console.error('Error fetching cities:', error);
      majorCities.current = [];
    }
    )

    const movieResponse = getMovies();
    movieResponse.then((response) => {
      setMovies(response.data);
    })
    .catch((error) => 
      console.log("Could not fetch movies:", error)
    );
  }, [])

  const handleSearchChange = (city) => {
    setCity(city);
    if (city.length > 2) {
      const res = getCitites()
      res.then((response) => {
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
    setCities(majorCities.current)
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
    setCities([]);
  };

  return (
    <>
      <Header />
      <div className="search-container">
        <SearchBar
          placeholder="Search for a city 🗽..."
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          onClick={handleClick}
          value={city}
        />
        <Dropdown data={cities} handleSelection={handleCitySelection}/>
      </div>
      <div className='carousel-container'>
      <Carousel fade>
        {movies.map((movie) => 
          <Carousel.Item key={movie.movieId} className='movie-card'>
            <h3>{movie.movieName}</h3>
            {console.log(movie.imageUrl)}
            <img src={movie.imageUrl} alt={movie.movieName} />
            <Carousel.Caption>
            <p>{movie.content}</p>
            </Carousel.Caption>
            </Carousel.Item>
        )}
      </Carousel>
      </div>
      <Footer />
    </>
  );
};

export default SearchScreen;
