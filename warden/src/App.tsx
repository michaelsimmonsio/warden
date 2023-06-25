import React, { useState, useEffect } from 'react';
import ReportList from './components/ReportList';
import ReportDetail from './components/ReportDetail';
import { Report } from './types';
import './App.css';
import { MantineProvider } from '@mantine/core';

import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const App: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports();
    return () => {
      socket.disconnect();
    };
  }, []);

  

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="app">
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <ReportList reports={reports} handleReportClick={setSelectedReport} />
        <ReportDetail report={selectedReport} />
      </MantineProvider>
    </div>
  );
};

export default App;

export const sendMessageToSocket = (message: any) => {
  socket.emit('message', message);
};
