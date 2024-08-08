import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notification = (error, rejectWithValue) => {
  let message = "An unexpected error occurred. Please try again.";

  if (error.response) {
    switch (error.response.status) {
      case 400:
        message = "Bad request. Please check your input.";
        break;
      case 404:
        message = "Service not found.";
        break;
      case 401:
        message = "Email or password invalid";
        break;
      case 409:
        message = "Such email already exists";
        break;

      case 500:
        message =
          "Server error. Something went wrong on our end. Please try again later.";
        break;
      default:
        message = error.response.data?.message || message;
    }
  }
  toast.error(message);
  return rejectWithValue(message);
};

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const signupThunk = createAsyncThunk(
  "users/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("users/signup", credentials);
      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const signinThunk = createAsyncThunk(
  "users/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("users/signin", credentials);
      setAuthHeader(response.data.token);
      toast.success("Log in is successful");
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const signoutThunk = createAsyncThunk(
  "users/signout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("users/signout");
      clearAuthHeader();
      toast.success("Log out successful");
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.users.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.get("users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
