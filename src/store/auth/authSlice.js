import {createSlice} from "@reduxjs/toolkit";
import { registerUser, userLogin, userLogout } from './authActions'


const userToken = localStorage.getItem('cbs-jwt-token')
  ? localStorage.getItem('cbs-jwt-token')
  : null;

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    isLoggedIn: false,
    isRegistered: false,
    error: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, {payload}) => {
            state.userInfo = payload;
        }
    },
    extraReducers: {
        // login user
        [userLogin.pending]: (state) => {
            state.loading = true;
            state.error = null
        },
        [userLogin.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload;
            state.isLoggedIn  = true;
            state.isRegistered = true;
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        //logout user
        [userLogout.pending]: (state) => {
            state.loading = true;
            state.error = null
        },
        [userLogout.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.userToken = null;
            state.isLoggedIn = false;
        },
        [userLogout.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.isRegistered = true; // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const {logout, setCredentials} = authSlice.actions;
export default authSlice.reducer;