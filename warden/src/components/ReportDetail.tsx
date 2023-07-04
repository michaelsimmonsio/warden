import React from 'react';
import { Report } from '../types';
import { RejectButton, PunishmentButton, DeleteButton, } from './Buttons';
import "../App.css"
import { Accordion } from '@mantine/core';

interface ReportDetailProps {
  report: Report | null;
}

const exampleJson = {
  "1688426680": "This is an example message!",
  "1688426681": "Messages are stored in a JSON format, with a UNIX timestamp and the message content as a string",
  "1688426682": "You can extend on the backend API to add more information to the JSON object, such as the message ID, or the channel ID",
  "1688426683": "This API can be used for any platform as long as previous messages and timestamps are stored.",
  "1688426684": "For example, you can use a Discord bot to fetch previous messages and dates, and then send them to the API",
  "1688426685": "This can work on other platforms too, such as Telegram, or a custom chat system, or even game servers like Minecraft",
  "1688426686": "This feature is not necessary, but may help provide context for any reports.",
}

// convert unix to time
function unixToDate(unix: string): string {
  return new Date(parseInt(unix) * 1000).toString();
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report }) => {
  if (!report) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div className="center"></div> 
      </div> // You can add things here, I prefer it blank
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
        <div className="report-detail-left"style={{ flex: 1, marginRight: '10px' }}>
          <h1>Report Information</h1>
          <p>ID: <b>{report._id}</b></p>
          <p>UID: <b>{report.uid}</b></p>
          <p>Date: <b>{unixToDate(report.date)}</b></p>
          <p>Status: <b>{report.status}</b></p>
        </div>

        {/* Right side */}
        <div className="report-detail-right"style={{ flex: 1, marginLeft: '10px' }}>
          <h1>User Information</h1>
          <p>Reported User: <b>{report.reportedUser}</b></p>
          <p>Reporter: <b>{report.reporter}</b></p>
          <p>Reason: <b>{report.reason}</b></p>
          <p>Context: <b>{report.context}</b></p>
        </div>
      </div>

      {/* Accordion panel */}
      <Accordion style={{ marginBottom: '10px', alignItems: 'center' }}>
        <Accordion.Item value="jsonPanel">
          <Accordion.Control>User's Previous Messages</Accordion.Control>
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

      </div>
    </div>
  );
};

export default ReportDetail;
