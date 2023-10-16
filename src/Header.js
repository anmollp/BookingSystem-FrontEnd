import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post('http://192.168.0.13:8000/auth/logout')
        .then(_ => {
            navigate("/")
        })
        .catch(error => {
            alert("Could not logout: ", error);
        })
    }

    return (
        <div className="header">
                <h1>GoCineWave</h1>
                <p onClick={handleLogout}>Logout</p>
        </div>
    );
}

export default Header;
