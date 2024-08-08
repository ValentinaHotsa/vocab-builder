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
        message = "Data not found.";
        break;
      case 409:
        message = "Such a word exists";
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

export const fetchCategories = createAsyncThunk(
  "words/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("words/categories");
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const fetchAllWords = createAsyncThunk(
  "words/all",
  async ({ page, search, category, verbType }, { rejectWithValue }) => {
    try {
      let url = `words/all?keyword=${search}&page=${page}`;

      if (category !== "all") {
        url += `&category=${category}`;
        if (category === "verb") {
          if (verbType !== undefined) {
            url += `&isIrregular=${verbType}`;
          }
        }
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const ownWords = createAsyncThunk(
  "words/own",
  async ({ page, search, category, verbType }, { rejectWithValue }) => {
    try {
      let url = `words/own?keyword=${search}&page=${page}`;

      if (category !== "all") {
        url += `&category=${category}`;
        if (category === "verb") {
          if (verbType !== undefined) {
            url += `&isIrregular=${verbType}`;
          }
        }
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const createWord = createAsyncThunk(
  "words/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("words/create", data);

      toast.success("A new word has been successfully created.");
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
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
      return notification(error, rejectWithValue);
    }
  }
);

export const editWord = createAsyncThunk(
  "words/edit",
  async ({ wordsId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`words/edit/${wordsId}`, data);
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
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
      return notification(error, rejectWithValue);
    }
  }
);

export const getStatistics = createAsyncThunk(
  "words/statistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("words/statistics");

      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const getTasks = createAsyncThunk(
  "words/tasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("words/tasks");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);

export const addAnswers = createAsyncThunk(
  "words/answers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("words/answers", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return notification(error, rejectWithValue);
    }
  }
);
