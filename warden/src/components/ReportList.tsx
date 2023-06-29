import React, { useState } from 'react';
import { Report } from '../types';
import { Pagination } from '@mantine/core';

interface ReportListProps {
  reports: Report[];
  handleReportClick: (report: Report) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, handleReportClick }) => {
  const itemsPerPage = 10; // Hard-coded for now
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentReports = reports.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="report-list">
      <div id="title">
        <p id="titlep">Warden Reports {reports.length}</p>
      </div>
      {currentReports.map((report, index) => (
        <div key={index} onClick={() => handleReportClick(report)}>
          {report._id} - {report.reportedUser}
        </div>
      ))}

      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ReportList;
