import { useState } from "react";
import { fetchAllWords } from "../../redux/word/operations";
import { selectTotalPages } from "../../redux/word/selectors";
import css from "./WordsPagination.module.css";

const WordsPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return <div>WordsPagination</div>;
};

export default WordsPagination;
