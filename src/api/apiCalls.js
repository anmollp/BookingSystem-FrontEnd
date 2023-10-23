import axios from "axios";
import { BASE_URL } from "../constants";

export const loginUser = (credentials) => {
    return axios.post(BASE_URL + "/auth/login", credentials)
    
};

export const logoutUser = () => {
    return axios.post(BASE_URL + "/auth/logout")
    
};

export const getCitites = () => {
    return axios.get(BASE_URL + "/city");
};

export const getMovies = () => {
    return axios.get(BASE_URL + "/movie");
};

export const getTheaterShow = () => {
    return axios.get(BASE_URL + "/theater_show");
};
