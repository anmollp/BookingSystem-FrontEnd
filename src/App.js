import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import LoginPage from './page/LoginPage/LoginPage';
import RegisterPage from './page/RegisterPage/RegisterPage';
import SearchPage from './page/SearchPage/SearchPage';

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/search" element={<SearchPage/>}/>
        {/* <Route path="/theaterShow" element={<TheaterShowScreen/>}/> */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
  );
}

export default App;
