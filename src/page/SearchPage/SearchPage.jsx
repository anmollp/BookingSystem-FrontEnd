import React, { useRef, useEffect, useState, useNavigate } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Dropdown from '../../components/Dropdown';
import SearchBar from '../../components/SearchBar';
import Carousel from 'react-bootstrap/Carousel';
import '../SearchPage/SearchPage.css';
import { getCitites, getMovies, getMoviesByCity, getTheatersByCity } from '../../api/apiCalls';

const SearchScreen = () => {
  const majorCities = useRef([]);
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);


  useEffect(() => {
    const cityResponse = getCitites();
    cityResponse.then((response) => {
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


  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity.cityName);
    const theaterCityresponse = getTheatersByCity(selectedCity.cityId);
    theaterCityresponse.then((response) => {
      console.log("Theaters: ", response.data);
      setTheaters(response.data);
    })
    .catch((error) => {
      console.error("Couldn't fetch theaters for: ", selectedCity.cityId);
    })

    const movieCityResponse = getMoviesByCity(selectedCity.cityId);
    movieCityResponse.then((response) => {
      console.log("Movies in city: ", response.data);
      setMovies(response.data);
    })
    .catch((error) => console.error("Couldn't fetch movies for city"))
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
          onClick={() => setCities(majorCities.current)}
          value={city}
        />
        <Dropdown data={cities} handleSelection={handleCitySelection}/>
      </div>
      <div className='carousel-container'>
      <Carousel fade>
        {movies.map((movie) => 
          <Carousel.Item key={movie.movieId} className='movie-card'>
            <h3>{movie.movieName}</h3>
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
