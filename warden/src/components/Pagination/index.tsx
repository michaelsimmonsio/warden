import React from 'react';

interface Props {
    totalReports: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ totalReports, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalReports / 10);

    return (
        <div>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
        Page {currentPage} of {totalPages}
      </span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
