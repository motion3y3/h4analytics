import './App.css';
import { Bar } from '@ant-design/charts';
import { Card, Layout, Menu } from 'antd';
import { Column } from '@ant-design/plots';
import firebase from 'firebase/app';
import 'firebase/database';
import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAttendance } from './utils/firebase';
import { DocumentData } from 'firebase/firestore';
import Dashboard from './view/dashboard';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';


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
  const [selectedKey, setSelectedKey] = useState("1");

  const handleSelectedKeyChange = (info: { key: React.Key; keyPath: React.Key[]; item: React.ReactInstance }) => {
    setSelectedKey(info.key.toString());
  };

  useEffect(() => {
    const getAttendanceMap = async () => {
      const attendanceMap = await getAttendance();
      setAttendanceData(attendanceMap);
    };

    getAttendanceMap();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', color: 'white' }}>
        <div className="logo" />
        <div style={{ color: 'white' }}>{"Hall 4 Analytics"}</div>
      </Header>

      <Layout>
        <Sider width={200} style={{ backgroundColor: '#f0f0f0' }}>
          <Menu mode="vertical" selectedKeys={[selectedKey]} defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Report</Menu.Item>
            <Menu.Item key="2">Saints Namelist</Menu.Item>
            <Menu.Item key="3">Serving Ones</Menu.Item>
          </Menu>
        </Sider>

        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Dashboard />
          </div>
        </Content>
      </Layout>
    </Layout>
  );

}






export default App;
