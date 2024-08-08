import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalPages, selectWords } from "../../redux/word/selectors";
import { fetchAllWords, addWord } from "../../redux/word/operations";
import Dashboard from "../../components/Dashboard/Dashboard";
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

  const handleActions = (word) => {
    dispatch(addWord(word._id));
  };

  return (
    <>
      <Dashboard onFilterChange={handleFilterChange} pageType="recommend" />
      <WordsTable
        words={words}
        handleActions={handleActions}
        actionType="recommend"
      />
      <WordsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default RecommendPage;
