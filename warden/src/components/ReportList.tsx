import React, { useState } from 'react';
import { Report } from '../types';
import { Pagination, Input, MultiSelect } from '@mantine/core';
import { SignOutButton } from './Buttons';



interface ReportListProps {
  reports: Report[];
  handleReportClick: (report: Report) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, handleReportClick }) => {
  const itemsPerPage = 10; // Hard-coded for now
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);


  const statusOptions = [
    { value: 'active', label: 'Active'},
    { value: 'accepted', label: 'Accepted' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'TestStatus', label: 'testing mode'}
   ];

  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredReports = reports.filter(
    (report) =>
      // @ts-ignore (.includes doesn't work w/ numbers, but search term will never be a number anyways)
      (report._id.includes(searchTerm.toString()) || report.reportedUser.includes(searchTerm)) &&
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
        <p id="titlep">Warden | Demo </p>
      </div>

      <div className="report-list-features" style={{ marginTop: '0px' }}>
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by ID or Username"
        />
      </div>
      {currentReports.map((report, index) => (
        <div className="report-list-item" key={index} onClick={() => handleReportClick(report)}>
          {report._id} - {report.reportedUser}
        </div>
      ))}

      <Pagination  className="report-list-features" total={totalPages} value={currentPage} onChange={handlePageChange} />


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
      <SignOutButton />



    </div>
    

  );
};

export default ReportList;
