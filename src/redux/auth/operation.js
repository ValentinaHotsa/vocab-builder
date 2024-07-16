import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
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
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
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
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
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
