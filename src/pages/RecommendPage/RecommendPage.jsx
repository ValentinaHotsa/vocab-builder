import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalPages, selectWords } from "../../redux/word/selectors";
import { fetchAllWords } from "../../redux/word/operations";
import WordsTable from "../../components/WordsTable/WordsTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";

const RecommendPage = () => {
  const dispatch = useDispatch();
  const words = useSelector(selectWords);
  const totalPages = useSelector(selectTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    verbType: "",
  });

  useEffect(() => {
    // console.log("Dispatching with filters:", filters);
    dispatch(
      fetchAllWords({
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

  const handleActions = (word) => {};

  return (
    <>
      <Dashboard onFilterChange={handleFilterChange} />
      <WordsTable words={words} handleActions={handleActions} />
      <WordsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default RecommendPage;
