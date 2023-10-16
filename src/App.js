import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import TheaterShowScreen from './TheaterShow';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginScreen />}/>
      <Route path="/search" element={<SearchScreen/>}/>
      <Route path="/theaterShow" element={<TheaterShowScreen/>}/>
    </Routes>
    </>
  );
}

export default App;
