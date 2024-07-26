import { useState } from "react";
import { fetchAllWords } from "../../redux/word/operations";
import { selectTotalPages } from "../../redux/word/selectors";
import css from "./WordsPagination.module.css";

const WordsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const createPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
      >
        ««
      </button>
      <button
        className="pagination-btn"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      {createPageNumbers().map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
      <button
        className="pagination-btn"
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        »»
      </button>
    </div>
  );
};

export default WordsPagination;
