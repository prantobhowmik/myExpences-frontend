import React from 'react';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onPageChange }) => {
  if (pageCount <= 1) return null;
  return (
    <nav className="flex justify-center items-center gap-2 mt-4 select-none">
      <button
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="px-2 text-gray-600 dark:text-gray-300">
        Page {page} of {pageCount}
      </span>
      <button
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
