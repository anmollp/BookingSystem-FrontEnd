import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from '../../store/auth/authActions';
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import Signup from '../../components/Signup'
import BackgroundSlider from '../../components/BackgroundSlider';
import './LoginPage.css'

const LoginPage = () => {
    const [customError, setCustomError] = useState(null);
    const {loading, isLoggedIn, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/search')
        }
        if(error) setCustomError(error)
    }, [navigate, isLoggedIn, error])

    const submitForm = (data) => {
        dispatch(userLogin(data))
    };

    return (
        <>
        <BackgroundSlider/>
        <form onSubmit={handleSubmit(submitForm)} className="container">
            <h1 className="title">Welcome to GoCineWave: Log In and Reel in the Fun!</h1>
            {customError && <Error className="error-message">{error}</Error>}
            <div className='form-group'>
                <input
                type='email'
                placeholder='Email'
                className='form-input'
                {...register('email')}
                required
                />
            </div>
            <div className='form-group'>
                <input
                type='password'
                placeholder='Password'
                className='form-input'
                {...register('password')}
                required
                />
            </div>
            <button type='submit' className="login-button" disabled={loading}>
                {loading ? <Spinner/> :'Login'}
            </button>
        </form>
        {customError && <Signup onClick={navigate('/register')}>New user? Register!!</Signup>}
        </>
    );
};

export default LoginPage;
