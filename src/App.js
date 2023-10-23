import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import './style.css';
import LoginPage from './page/LoginPage/LoginPage';
import RegisterPage from './page/RegisterPage/RegisterPage';
import SearchPage from './page/SearchPage/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage/>}/>
        {/* <Route path="/theaterShow" element={<TheaterShowScreen/>}/> */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
