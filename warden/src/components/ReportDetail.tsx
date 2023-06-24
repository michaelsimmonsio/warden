import React from 'react';
import { Report } from '../types';
import { RejectButton, PunishmentButton } from './Buttons';


interface ReportDetailProps {
  report: Report | null;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report }) => {
  if (!report) return <div>Select a report to view details</div>;

  return (
    <div className="report-detail">
      <h1>Report Detail</h1>
      <p>ID: {report.id}</p>
      <p>Reported User: {report.reportedUser}</p>
      <p>Reporter: {report.reporter}</p>
      <p>Reason: {report.reason}</p>
      <p>Context: {report.context}</p>
      {/* Add additional actions here */}

      <PunishmentButton report={{
        id: report.id,
        username: report.reportedUser,
        reason: report.reason,
        date: ''
      }} />
      <RejectButton />


      
    </div>
  );
};

export default ReportDetail;
