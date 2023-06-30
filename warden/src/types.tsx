export interface Report {
    _id: number;
    uid: string;    
    reportedUser: string;
    reporter: string;
    reason: string;
    context: string;
    date: string;
    status: string;
    contextJson: JSON;
  }
  