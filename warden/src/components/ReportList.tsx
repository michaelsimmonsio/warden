import React, { useState } from 'react';
import { Report } from '../types';
import { Pagination, Input, MultiSelect } from '@mantine/core';

interface ReportListProps {
  reports: Report[];
  handleReportClick: (report: Report) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, handleReportClick }) => {
  const itemsPerPage = 10; // Hard-coded for now
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const statusOptions = ['Accepted', 'Rejected', 'Pending', 'Archived', 'TestStatus'];

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredReports = reports.filter(
    (report) =>
    // works fine, will fix error later
      (report._id.includes(searchTerm) || report.reportedUser.includes(searchTerm)) &&
      (selectedStatus.length === 0 || selectedStatus.includes(report.status))
  );

  const currentReports = filteredReports.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  const handleStatusChange = (values: string[]) => {
    setSelectedStatus(values);
    setCurrentPage(1); // Reset to the first page when the status filter changes
  };

  return (
    <div className="report-list">
      <div id="title">
        <p id="titlep">Warden Reports {filteredReports.length}</p>
      </div>
      {currentReports.map((report, index) => (
        <div key={index} onClick={() => handleReportClick(report)}>
          {report._id} - {report.reportedUser}
        </div>
      ))}

      <Pagination total={totalPages} value={currentPage} onChange={handlePageChange} />

      <div style={{ marginTop: '0px' }}>
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by ID or User"
        />
      </div>

      <div style={{ marginTop: '0px' }}>
        <MultiSelect
          data={statusOptions}
          value={selectedStatus}
          onChange={handleStatusChange}
          placeholder="Filter by Status"
          multiple
          searchable
        />
      </div>
    </div>
  );
};

export default ReportList;
