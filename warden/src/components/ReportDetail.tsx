import React from 'react';
import { Report } from '../types';
import { RejectButton, PunishmentButton, DeleteButton, TestNotification } from './Buttons';
import "../App.css"
import { Accordion } from '@mantine/core';

interface ReportDetailProps {
  report: Report | null;
}

const exampleJson = {
  1688150234: "message",
  1688150235: "message",
  1688150256: "message",

}

// convert unix to time
function unixToDate(unix: string): string {
  return new Date(parseInt(unix) * 1000).toString();
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report }) => {
  if (!report) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div>Select a report to view details</div>
      </div>
    );
  }

  const renderKeyValueList = () => {
    return Object.entries(exampleJson).map(([key, value]) => (
      <li key={key}>
        <strong>{unixToDate(key)}:</strong> {value}
      </li>
    ));
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

      {/* Accordion panel */}
      <Accordion style={{ marginBottom: '10px', alignItems: 'center' }}>
        <Accordion.Item value="jsonPanel">
          <Accordion.Control>Previous Messages</Accordion.Control>
          <Accordion.Panel>
            <ul>
              {renderKeyValueList()}
            </ul>
          </Accordion.Panel>
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
        <RejectButton report={{
          id: report._id,
          username: report.reportedUser,
          reason: report.reason,
          date: ''
        }} />        <DeleteButton report={{
          id: report._id,
          username: report.reportedUser,
          reason: report.reason,
          date: ''
        }} />

        <TestNotification />
      </div>
    </div>
  );
};

export default ReportDetail;
