import React from 'react';
import { Report } from '../types';
import { RejectButton, PunishmentButton } from './Buttons';
import "../App.css"

interface ReportDetailProps {
  report: Report | null;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report }) => {
  if (!report) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'right', height: '100%' }}>
        <div>Select a report to view details</div>
      </div>
    );
  }


  return (
    <div className="report-detail">
      <h1>Report Information</h1>
      <p>ID: {report._id}</p>
      <p>UID: {report.uid}</p>
      <p>Reported User: {report.reportedUser}</p>
      <p>Reporter: {report.reporter}</p>
      <p>Reason: {report.reason}</p>
      <p>Context: {report.context}</p>
      <p>Date: {report.date}</p>
      <p> Status: {report.status}</p>
      {/* Add additional actions here */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <PunishmentButton report={{
          id: report._id,
          username: report.reportedUser,
          reason: report.reason,
          date: ''
        }} />
        <RejectButton />
      </div>
    </div>
  );
};

export default ReportDetail;