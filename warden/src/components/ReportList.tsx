import React from 'react';
import { Report } from '../types';

interface ReportListProps {
  reports: Report[];
  handleReportClick: (report: Report) => void;
}

const ReportList: React.FC<ReportListProps> = ({ reports, handleReportClick }) => {
  return (
    <div className="report-list">
      {reports.map((report, index) => (
        <div key={index} onClick={() => handleReportClick(report)}>
          {report.id} - {report.reportedUser}
        </div>
      ))}
    </div>
  );
};

export default ReportList;
