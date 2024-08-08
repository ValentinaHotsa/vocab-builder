import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchAllWords,
  ownWords,
  deleteWord,
  addWord,
  createWord,
  editWord,
  getStatistics,
  getTasks,
  addAnswers,
} from "./operations";

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

const initialState = {
  words: [],
  ownWords: [],
  categories: [],
  result: [],
  statistics: null,
  tasks: [],
  page: null,
  totalPages: null,
  perPage: null,
  isLoading: false,
  error: null,
};

const wordSlice = createSlice({
  name: "words",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, handleRejected)

      .addCase(fetchAllWords.pending, handlePending)
      .addCase(fetchAllWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.words = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.perPage = action.payload.perPage;
      })
      .addCase(fetchAllWords.rejected, handleRejected)

      .addCase(ownWords.pending, handlePending)
      .addCase(ownWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownWords = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.perPage = action.payload.perPage;
      })
      .addCase(ownWords.rejected, handleRejected)
      .addCase(deleteWord.pending, handlePending)
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.ownWords = state.ownWords.filter(
          (word) => word._id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteWord.rejected, handleRejected)

      .addCase(addWord.pending, handlePending)
      .addCase(addWord.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addWord.rejected, handleRejected)

      .addCase(createWord.pending, handlePending)
      .addCase(createWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownWords = [...state.ownWords, action.payload];
      })
      .addCase(createWord.rejected, handleRejected)

      .addCase(editWord.pending, handlePending)
      .addCase(editWord.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.ownWords.findIndex(
          (word) => word._id === action.payload._id
        );
        if (index !== -1) {
          state.ownWords[index] = action.payload;
        }
      })
      .addCase(editWord.rejected, handleRejected)
      .addCase(getStatistics.pending, handlePending)
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistics = action.payload.totalCount;
      })
      .addCase(getStatistics.rejected, handleRejected)
      .addCase(getTasks.pending, handlePending)
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [...action.payload.tasks];
      })
      .addCase(getTasks.rejected, handleRejected)
      .addCase(addAnswers.pending, handlePending)
      .addCase(addAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
      });
  },
});

export const wordReducer = wordSlice.reducer;
