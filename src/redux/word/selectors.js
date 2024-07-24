//wordSelectors.js
export const selectCategories = (state) => state.words.categories;
export const selectWords = (state) => state.words.words;
export const selectOwnWords = (state) => state.words.ownWords;
export const selectTotalPages = (state) => state.words.totalPages;
export const selectTotalPage2 = (state) => state.words.totalPage2;
export const selectError = (state) => state.words.error;
export const selectIsLoading = (state) => state.words.isLoading;
