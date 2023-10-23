import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from "react-redux";
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import { registerUser } from '../../store/auth/authActions';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import './RegisterPage.css';

const RegisterPage = () => {
    const [customError, setCustomError] = useState(null);

    const {loading, userInfo, error, success} = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    useEffect(() => {
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/search')
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
        // Show error if registration was unsuccessful
        if(error) setCustomError(error)
      }, [navigate, userInfo, success, error])

    const submitForm = (data) => {
        if(data.password !== data.confirmPassword) {
            setCustomError('Password mismatch');
            return;
        }
        data.emailId = data.emailId.toLowerCase();
        dispatch(registerUser(data));
    }

    return (
        <>
        <Header/>
        <form className="container" onSubmit={handleSubmit(submitForm)}>
        <h1 className="title">Join the Cinematic Journey: Register Now!</h1>
            {error && <Error>{customError}</Error>}
            <div className="form-group">
                <input
                placeholder='Email Id'
                type="text"
                className="form-input"
                {...register("emailId")}
                required
                />
            </div>
            <div className="form-group">
                <input
                placeholder='Password'
                type="password"
                className="form-input"
                {...register("password")}
                required
                />
            </div>
            <div className="form-group">
                <input
                placeholder='Confirm Password'
                type="password"
                className="form-input"
                {...register("confirmPassword")}
                required
                />
            </div>
            <button type='submit' className='register-button' disabled={loading}>{loading ? <Spinner/> : 'Register'}</button>
        </form>
        <Footer/>
        </>
    );
};

export default RegisterPage;
