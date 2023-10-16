import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import Header from './Header.js'
import Footer from './Footer.js'
import {MovieCard} from './Movie.js'
import { movieData } from './movie-data.js';
import {theaterShowData} from './theater-show-data.js'
import {urls} from './Config.js'
import {TheaterShow} from './TheaterShowRow.js'
import "react-datepicker/dist/react-datepicker.css";


const TheaterShowScreen = ({movieId}) => {
    const [theaterShow, setTheaterShow] = useState(theaterShowData);
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        const selectedDate = new Date(date)
        console.log('Today\'s date: ' + selectedDate)
        setDate(selectedDate)
    }

    useEffect(() => {
        console.log(urls.getTheaterShowsUrl + `?movieId=${movieId}&date=${date.toISOString()}`)
        fetch(urls.getTheaterShowsUrl + `?movieId=${movieId}&date=${date.toISOString()}`)
        .then(response => {
            console.log("Get City api: " + response.json)
            setTheaterShow(response.data)
          })
          .catch(error => {
            console.error('Error fetching theater shows:', error)
          })
    }, [date])

    return (
        <>
        <Header/>
        <div className='date-picker'>
        <DatePicker onChange={handleDateChange} selected={date}/>
        </div>
        {
          theaterShow.map((item) => (
            <TheaterShow key={item.id} theaterName={item.theaterName} showDetails={item.shows}/>
          ))
        }
        <Footer/>
        </>
    )
};

export default TheaterShowScreen