//wordOperations.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api/";

export const fetchCategories = createAsyncThunk(
  "words/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("words/categories");
      return response.data;
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.meddage);
    }
  }
);

// export const wordsAll = createAsyncThunk(
//   "words/all",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(`words/all`);

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchAllWords = createAsyncThunk(
  "words/all",
  async ({ page, search, category, verb }, { rejectWithValue }) => {
    try {
      if (category === "all") {
        const response = await axios.get(
          `words/all?keyword=${search}&page=${page}`
        );
        return response.data;
      } else {
        const response = await axios.get(
          `words/all?keyword=${search}&category=${category}&isIrregular=${verb}&page=${page}`
        );
        return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);

export const ownWords = createAsyncThunk(
  "words/own",
  async ({ page, search, category, verb }, { rejectWithValue }) => {
    try {
      if (category === "all") {
        const response = await axios.get(
          `words/own?keyword=${search}&page=${page}`
        );
        return response.data;
      } else {
        const response = await axios.get(
          `words/own?keyword=${search}&category=${category}&isIrregular=${verb}&page=${page}`
        );
        return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);

export const createWord = createAsyncThunk(
  "words/create",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("words/create", credentials);
      return response.data;
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWord = createAsyncThunk(
  "words/delete",
  async (wordsId, { rejectWithValue }) => {
    try {
      await axios.delete(`words/delete/${wordsId}`);
      return wordsId;
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);

export const editWord = createAsyncThunk(
  "words/edit",
  async ({ wordsId, credentials }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`words/edit/${wordsId}`, {
        ...credentials,
      });
      return response.data;
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);

export const addWord = createAsyncThunk(
  "words/add",
  async (wordsId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`words/add/${wordsId}`);
      return response.data;
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      return rejectWithValue(error.message);
    }
  }
);