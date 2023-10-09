import './App.css';
import { Bar } from '@ant-design/charts';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';
import firebase from 'firebase/app';
import 'firebase/database';
import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAttendance } from './utils/firebase';
import { DocumentData } from 'firebase/firestore';
import Dashboard from './view/dashboard';


type AttendanceData = {
  meeting: string;
  present: number;
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF_3VZXSslRPK-Ubph-In-YfVj41ZcoQA",
  authDomain: "church-of-god-kl.firebaseapp.com",
  projectId: "church-of-god-kl",
  storageBucket: "church-of-god-kl.appspot.com",
  messagingSenderId: "144292826716",
  appId: "1:144292826716:web:7488a12179aab337ee2099"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [attendanceData, setAttendanceData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getAttendanceMap = async () => {
      const attendanceMap = await getAttendance();
      setAttendanceData(attendanceMap);
    };

    getAttendanceMap();
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );

}






export default App;
