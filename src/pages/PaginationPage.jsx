import React, { useState } from 'react';
import Pagination from '../components/common/Pagination';

const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const mockData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`
  }));

 
  return (
    <div >
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PaginationPage;
