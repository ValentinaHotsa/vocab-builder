import { useState } from "react";
import { fetchAllWords } from "../../redux/word/operations";
import { selectTotalPages } from "../../redux/word/selectors";
import css from "./WordsPagination.module.css";
import svg from "../../assets/icon.svg";

const WordsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const createPageNumbers = () => {
    let pages = [];
    let key = 0;
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) {
        pages.push(1);
        if (currentPage > 4) {
          pages.push(`dots-${++key}`);
        }
      }
      const staretPage = Math.max(currentPage - 2, 1);
      const endPage = Math.min(currentPage + 2, totalPages);

      for (let i = staretPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pages.push(`dots-${++key}`);
        }
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className={css.paginationContainer}>
      <button
        className={css.buttonArrow}
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
      >
        <svg>
          <use href={`${svg}#icon-pagination-first`} />
        </svg>
      </button>
      <button
        className={css.buttonArrow}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg>
          <use href={`${svg}#icon-pagination-back`} />
        </svg>
      </button>
      {createPageNumbers().map((page, index) =>
        typeof page === "string" ? (
          <span key={page}>...</span>
        ) : (
          <button
            key={page}
            className={` ${css.btnNumber}  ${
              page === currentPage ? css.active : ""
            }`}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className={css.buttonArrow}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg>
          <use href={`${svg}#icon-pagination-next`} />
        </svg>
      </button>
      <button
        className={css.buttonArrow}
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        <svg>
          <use href={`${svg}#icon-pagination-last`} />
        </svg>
      </button>
    </div>
  );
};

export default WordsPagination;
