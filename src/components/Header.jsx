import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from '../store/auth/authActions';
import Spinner from './Spinner';
import '../styles/header.css'

const Header = () => {
    const {loading, userToken, error, success} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(userToken === null) navigate('/login')
        if(error) alert(error)
    }, [navigate, error, userToken])

    const handleLogout = () => {
       dispatch(userLogout());
    }

    return (
        <div className="header">
                <h1>GoCineWave</h1>
                {userToken && <div onClick={handleLogout} disabled={loading}>{loading ? <Spinner/> : 'Logout'}</div>}
        </div>
    );
}

export default Header;
