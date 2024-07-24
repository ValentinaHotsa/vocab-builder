import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signinThunk,
  signoutThunk,
  signupThunk,
  refreshUserThunk,
} from "./operation";

const initialState = {
  user: "",
  token: "",
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

const authSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, handlePending)
      .addCase(signupThunk.rejected, handleRejected)
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.name;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signinThunk.pending, handlePending)
      .addCase(signinThunk.rejected, handleRejected)
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.name;
        state.isLoggedIn = true;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user = action.payload.name;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(signoutThunk.pending, handlePending)
      .addCase(signoutThunk.rejected, handleRejected)
      .addCase(signoutThunk.fulfilled, () => {
        console.log("Signout fulfilled");
        return { ...initialState };
      });
  },
});

export const authReducer = authSlice.reducer;
