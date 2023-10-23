import axios from 'axios';
import { BASE_URL } from "../../constants";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        const { data } = await axios.post(
          `${BASE_URL}/auth/login`,
          { email, password },
          config
        )
  
        // store user's token in local storage
        localStorage.setItem('cbs-jwt-token', data)

        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const userLogout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        const { data } = await axios.post(
          `${BASE_URL}/auth/logout`,
          config
        )
  
        // remove user's token from local storage
        localStorage.removeItem('cbs-jwt-token')

        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )


  export const registerUser = createAsyncThunk(
    'auth/register',
    async ({emailId, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        await axios.post(
          `${BASE_URL}/auth/register`,
          { emailId, password },
          config
        )
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )