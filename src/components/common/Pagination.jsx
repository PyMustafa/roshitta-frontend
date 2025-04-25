import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-7 h-7 rounded-full flex items-center justify-center text-md transition-all
            ${i === currentPage
              ? 'bg-[#5F6FFF] text-white font-medium'
              : 'bg-white text-black hover:bg-[#5F6FFF] border border-gray-200 hover:text-white'}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center my-4 space-x-3">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="flex items-center px-4 h-7 rounded-full text-md transition-all
            bg-white text-black hover:bg-[#5F6FFF] border border-gray-200 hover:text-white"
        >
          Prev
        </button>
      )}

      {/* For small screens, show only current page */}
      <div className="block md:hidden w-7 h-7 rounded-full bg-[#5F6FFF] text-white font-medium flex items-center justify-center">
        {currentPage}
      </div>

      {/* For medium and larger screens, show full pagination */}
      <div className="hidden md:flex space-x-3">
        {getPageNumbers()}
      </div>

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="flex items-center px-4 h-7 rounded-full text-md transition-all
            bg-white text-black hover:bg-[#5F6FFF] border border-gray-200 hover:text-white"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
