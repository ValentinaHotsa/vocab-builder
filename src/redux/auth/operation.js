import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const signupThunk = createAsyncThunk(
  "users/signup",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", body);
      const { user, token, message } = response.data;
      toast.success(message);
      token.set(token);
      return { user, token };
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);

export const signinThunk = createAsyncThunk(
  "users/signin",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signin", body);
      const { user, token } = response.data;
      token.set(token);
      return { user, token };
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
      await axios.post("/users/signout");
      token.unset(toast.success("You are successfully logout"));
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);
