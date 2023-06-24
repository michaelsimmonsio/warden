import React, { useState } from 'react';
import ReportList from './components/ReportList';
import ReportDetail from './components/ReportDetail';
import { Report } from './types';
import './App.css';
import { MantineProvider } from '@mantine/core';


// test data
const testData: Report[] = [
  { id: 1, reportedUser: 'user1', reporter: 'user2', reason: 'spam', context: 'message context 1' },
  { id: 2, reportedUser: 'user3', reporter: 'user4', reason: 'abuse', context: 'message context 2' },
  // add more data here
];

const App: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="app">
          <MantineProvider withGlobalStyles withNormalizeCSS>
          <ReportList reports={testData} handleReportClick={setSelectedReport} />
      <ReportDetail report={selectedReport} />
    </MantineProvider>
    </div>
  );
};

export default App;
