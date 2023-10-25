import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from '../store/auth/authActions';
import Spinner from './Spinner';
import '../styles/header.css'

const Header = ({ children, ...props }) => {
    const {loading, isLoggedIn, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn) navigate('/login')
        if(error) alert(error)
    }, [navigate, isLoggedIn, error])

    return (
        <div className="header">
                <h1>GoCineWave</h1>
                {isLoggedIn && <div onClick={dispatch(userLogout)} disabled={loading}>{loading ? <Spinner/> : 'Logout'}</div>}
        </div>
    );
}

export default Header;
