import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * A reusable pagination component for navigating through paginated data.
 * 
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current active page (1-based)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback when page changes, receives the new page number
 * @param {number} [props.siblingCount=1] - Number of siblings to show on each side of current page
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({ currentPage, totalPages, onPageChange, siblingCount = 1 }) => {
  // Don't render if we have only 1 page
  if (totalPages <= 1) return null;
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Generate page numbers to display
  const generatePagination = () => {
    // Pages to show
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range of pages to show around current page
    const leftSibling = Math.max(2, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add dots indicator if there's a gap
    if (leftSibling > 2) {
      pages.push('...');
    }
    
    // Add pages in the middle
    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }
    
    // Add dots indicator if there's a gap
    if (rightSibling < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if we have more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = generatePagination();

  return (
    <div className="flex items-center justify-center mt-6 space-x-1">
      {/* Previous page button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md ${
          currentPage === 1
            ? 'cursor-not-allowed text-gray-400'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next page button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md ${
          currentPage === totalPages
            ? 'cursor-not-allowed text-gray-400'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
