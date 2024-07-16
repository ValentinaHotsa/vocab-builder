import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinThunk, signoutThunk, signupThunk } from "./operation";
const initialState = {
  user: { name: "", email: "" },
  token: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.fulfilled, (state, action) => {
        console.log("Signup fulfilled:", action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        console.log("Signin fulfilled:", action.payload);
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(signoutThunk.fulfilled, () => {
        console.log("Signout fulfilled");
        return { ...initialState };
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
