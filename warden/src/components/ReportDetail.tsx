import React from 'react';
import { Report } from '../types';
import { RejectButton, PunishmentButton } from './Buttons';
import "../App.css"
import { Accordion } from '@mantine/core';

interface ReportDetailProps {
  report: Report | null;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report }) => {
  if (!report) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div>Select a report to view details</div>
      </div>
    );
  }

  return (
    <div className="report-detail">
      <div style={{ display: 'flex' }}>
        {/* Left side */}
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h1>Report Information</h1>
          <p>ID: {report._id}</p>
          <p>UID: {report.uid}</p>
          <p>Reported User: {report.reportedUser}</p>
          <p>Reporter: {report.reporter}</p>
          <p>Reason: {report.reason}</p>
          <p>Context: {report.context}</p>
          <p>Date: {report.date}</p>
          <p>Status: {report.status}</p>
        </div>

        {/* Right side */}
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <h1>User Information</h1>
          <p>ID: {report._id}</p>
          <p>UID: {report.uid}</p>
          <p>Reported User: {report.reportedUser}</p>
          <p>Reporter: {report.reporter}</p>
          <p>Reason: {report.reason}</p>
          <p>Context: {report.context}</p>
          <p>Date: {report.date}</p>
          <p>Status: {report.status}</p>
        </div>
      </div>

      <Accordion style={{ marginBottom: '10px', alignItems: 'center' }} defaultValue="customization">
        <Accordion.Item value="customization">
          <Accordion.Control>Previous Messages</Accordion.Control>
          <Accordion.Panel>{report.context}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* Add additional actions here */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
