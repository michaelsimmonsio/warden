import React from 'react';

interface Report {
    id: string;
    reportedUser: string;
    reporter: string;
    reason: string;
    messages: string[];
}

interface Props {
    report: Report | null;
}

const ReportDetails: React.FC<Props> = ({ report }) => {
    if (!report) {
        return <div>Select a report to see details</div>;
    }

    return (
        <div style={{ width: '70%', height: '100vh' }}>
            {/* Display report details and actions */}
        </div>
    );
};

export default ReportDetails;
