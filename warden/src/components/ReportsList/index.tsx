import React from 'react';

interface Report {
    id: string;
    reportedUser: string;
    reporter: string;
    reason: string;
    messages: string[];
}

interface Props {
    reports: Report[];
    onReportSelect: (report: Report) => void;
}

const ReportList: React.FC<Props> = ({ reports, onReportSelect }) => {
    return (
        <div style={{ overflowY: 'auto', width: '30%', height: '100vh' }}>
            {reports.map((report) => (
                <div key={report.id} onClick={() => onReportSelect(report)}>
                    {/* display the report information */}
                </div>
            ))}
        </div>
    );
};
export default ReportList;
