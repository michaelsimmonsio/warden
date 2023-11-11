import React, { useState, useEffect } from 'react';
import ReportList from './components/ReportList';
import ReportDetail from './components/ReportDetail';
import { Report } from './types';
import './App.css';
import { MantineProvider } from '@mantine/core';
import 'firebase/auth';
import { Notifications } from '@mantine/notifications';

import io from 'socket.io-client';

const socket = io('http://localhost:8000');

// START FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { DemoSignIn, GithubButton, SignInButton } from './components/Buttons';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdXbTUstwnkcQJ7EJGbFztZI9sK1vmVbg",
  authDomain: "warden-83967.firebaseapp.com",
  projectId: "warden-83967",
  storageBucket: "warden-83967.appspot.com",
  messagingSenderId: "756735335367",
  appId: "1:756735335367:web:c9aa066e959223a36d57e2",
  measurementId: "G-7PG3TVV9VM"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp); // Breaks the app lol

// FIREBASE LOGIN LOGIC

export const auth = getAuth(firebaseApp);

const App: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [user, setUser] = useState<any>(null); // Track the user state

  useEffect(() => {
    fetchReports();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe(); // Unsubscribe from the auth state listener
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

  if (!user) {
    return(
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>

      <div className='app'>
        <div className="login">
          <h1 className="login-title">Warden</h1>
          <div className="login-feature">
            <GithubButton  />
          </div>

          {/* <div className="login-feature">
            <SignInButton />
          </div> */}
          <div className='login-feature'>
            <DemoSignIn />
            </div>


        </div>
        </div>

        </MantineProvider>

    );
  }


  return (
    <div className="app">
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Notifications position='top-right'/> 
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

