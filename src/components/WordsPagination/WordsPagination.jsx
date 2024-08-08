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

    pages.push(1);

    if (currentPage > 3) {
      pages.push(`dots-${++key}`);
    }

    let startPage = Math.max(currentPage - 1, 2);
    let endPage = Math.min(currentPage + 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push(`dots-${++key}`);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
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
          <button key={page} className={css.btnNumber}>
            ...
          </button>
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
