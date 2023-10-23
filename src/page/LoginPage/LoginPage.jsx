import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import { userLogin } from '../../store/auth/authActions';
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'

const LoginPage = () => {
    const {loading, userToken, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userToken) {
            navigate('/search')
        }
    }, [navigate, userToken])

    const submitForm = (data) => {
        dispatch(userLogin(data))
    };

    return (
        <>
        <Header/>
        <form onSubmit={handleSubmit(submitForm)} className="container">
            <h1 className="title">Welcome to GoCineWave: Log In and Reel in the Fun!</h1>
            {error && <Error className="error-message">{error}</Error>}
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
            <button typ='submit' className="login-button" disabled={loading}>
                {loading ? <Spinner/> :'Login'}</button>
        </form>
        <Footer/>
        </>
    );
};

export default LoginPage;
