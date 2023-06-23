import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ReportList from './components/ReportsList';
import ReportDetails from './components/ReportDetails';
import Pagination from './components/Pagination';

const fetchReports = async (page: number) => {
  const { data } = await axios.get(`/api/reports?page=${page}`);
  return data;
};

const App = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useQuery(['reports', currentPage], () => fetchReports(currentPage), {
    keepPreviousData: true, // Enable this to keep old data while new data is being fetched
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

    // @ts-ignore
    return (
      <div style={{ display: 'flex' }}>
        <ReportList reports={data.reports} onReportSelect={setSelectedReport} />
        <ReportDetails report={selectedReport} />
        <Pagination
            totalReports={data.total}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
        />
      </div>
  );
};

export default App;
