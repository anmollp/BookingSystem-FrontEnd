import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from '../../store/auth/authActions';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import BackgroundSlider from '../../components/BackgroundSlider';
import './RegisterPage.css';

const RegisterPage = () => {
    const [customError, setCustomError] = useState(null);

    const {loading, userInfo, isRegistered, error} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    useEffect(() => {
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/search')
        // redirect user to login page if registration was successful
        if (isRegistered) navigate('/login')
        // Show error if registration was unsuccessful
        if(error) setCustomError(error)
      }, [navigate, userInfo, isRegistered, error])

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
        <BackgroundSlider/>
        <div className='container'>
        <h1 className="title">Join the Cinematic Journey: Register Now!</h1>
        <form onSubmit={handleSubmit(submitForm)}>
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
            <div className="form-group">
            <button type='submit' className='register-button' disabled={loading}>{loading ? <Spinner/> : 'Register'}</button>
            </div>
        </form>
        </div>
    </>
    );
};

export default RegisterPage;
