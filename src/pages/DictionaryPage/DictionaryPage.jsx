import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import Dashboard from "../../components/Dashboard/Dashboard";
import WordsTable from "../../components/WordsTable/WordsTable";
import {
  selectError,
  selectIsLoading,
  selectOwnWords,
  selectTotalPages,
  selectWords,
} from "../../redux/word/selectors";
import { fetchAllWords, ownWords } from "../../redux/word/operations";
import WordsPagination from "../../components/WordsPagination/WordsPagination";

const DictionaryPage = () => {
  const dispatch = useDispatch();
  const words = useSelector(selectOwnWords);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    verbType: "",
  });

  useEffect(() => {
    dispatch(
      ownWords({
        page: currentPage,
        search: filters.search,
        category: filters.category,
        verbType: filters.verbType,
      })
    );
  }, [dispatch, currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  // if (words.length === 0) {
  //   return <p>В вашому словнику ще немає слів.</p>;
  // }

  const handleAction = (word) => {};

  return (
    <div>
      <Dashboard onFilterChange={handleFilterChange} />
      <WordsTable words={words} handleAction={handleAction} />
      <WordsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DictionaryPage;
