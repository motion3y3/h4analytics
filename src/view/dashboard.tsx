import '../App.css';
import { Card, Col, Layout, Menu, Row, Table } from 'antd';
import { Column } from '@ant-design/plots';
import 'firebase/database';
import { useEffect, useState } from 'react';
import { getAttendance, getUsers } from '../utils/firebase';
import { DocumentData } from 'firebase/firestore';
import { Select } from 'antd';
import moment from 'moment-timezone';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import MonthSelection from './dateSelection';

const { Option } = Select;

function Dashboard() {
  const [attendanceData, setAttendanceData] = useState<DocumentData[]>([]);
  const [usersData, setUsers] = useState<DocumentData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  let isAllWeek: boolean = false;


  useEffect(() => {
    const getAttendanceMap = async () => {
      const attendanceMap = await getAttendance();
      const users = await getUsers();
      setAttendanceData(attendanceMap);
      setUsers(users);
    };

    getAttendanceMap();



    const getWeekOfMonth = () => {
      const now = moment().tz('Asia/Singapore'); // Replace with your desired timezone
      const firstDayOfMonth = moment(now).startOf('month');
      const firstSunday = firstDayOfMonth.clone().day(0); // Set to the first Sunday
      const weekOfMonth = now.diff(firstSunday, 'weeks') + 1;
      setSelectedWeek(weekOfMonth);
    };

    getWeekOfMonth();

  }, []);

  const handleMonthChange = (value: number) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
  };

  const handleWeekChange = (value: number) => {
    setSelectedWeek(value);
  };

  // Define a function to get the start and end dates of a specific week
  function getStartAndEndDate(year: number, month: number, week: number): [Date, Date] {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = new Date(firstDayOfMonth);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const dayOfWeek = firstDayOfWeek.getDay();

    if (week === 6) {
      // Special case: Get data for the entire month
      isAllWeek = true;
      return [firstDayOfMonth, lastDayOfMonth];
    } else {
      isAllWeek = false;
    }

    // Calculate the start day of the selected week
    firstDayOfWeek.setDate(1 + (week - 1) * 7 - dayOfWeek);

    // Calculate the end day of the selected week
    const endDayOfWeek = new Date(firstDayOfWeek);
    endDayOfWeek.setDate(endDayOfWeek.getDate() + 6);

    // Ensure the end day does not exceed the last day of the month
    if (endDayOfWeek > lastDayOfMonth) {
      endDayOfWeek.setDate(lastDayOfMonth.getDate());
    }

    return [firstDayOfWeek, endDayOfWeek];
  }

  const [startDate, endDate] = selectedWeek !== null
    ? getStartAndEndDate(selectedYear, selectedMonth, selectedWeek)
    : [null, null];

  // Format the dates as "DD/MM - DD/MM"
  const formattedStartDate = startDate?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year:'numeric' });
  const formattedEndDate = endDate?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year:'numeric' });


  // Filter the attendance data based on the selected month
  const filteredData = selectedWeek !== null
    ? attendanceData.filter((attendance) => {
      const date = new Date(attendance.date);
      const [startOfWeek, endOfWeek] = getStartAndEndDate(selectedYear, selectedMonth, selectedWeek);
      return date >= startOfWeek && date <= endOfWeek;
    })
    : attendanceData;


  // Sample data for the bar chart
  const data = [
    { meeting: 'psrp', present: 0 },
    { meeting: 'lifestudy', present: 0 },
    { meeting: 'cellgroup', present: 0 },
    { meeting: 'lordsday', present: 0 },
    { meeting: 'prophesying', present: 0 },
    { meeting: 'sheperding', present: 0 },
  ];

  const combinedData = Array.from(new Map(filteredData.map(item => [item.email, item])).values());

  combinedData.forEach((attendance) => {
    attendance.name = usersData.find((users) => users.email === attendance.email)?.name;
    if (attendance.psrp) {
      data.find((item) => item.meeting === 'psrp')!.present++;
    }
    if (attendance.lifestudy) {
      data.find((item) => item.meeting === 'lifestudy')!.present++;
    }
    if (attendance.cellgroup) {
      data.find((item) => item.meeting === 'cellgroup')!.present++;
    }
    if (attendance.lordsday) {
      data.find((item) => item.meeting === 'lordsday')!.present++;
    }
    if (attendance.prophesying) {
      data.find((item) => item.meeting === 'prophesying')!.present++;
    }
    if (attendance.sheperding) {
      data.find((item) => item.meeting === 'sheperding')!.present++;
    }
  });

  console.log(combinedData)

  const config = {
    data,
    xField: 'meeting',
    yField: 'present',
    title: {
      text: 'KL Hall 4 Attendance',
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'PSRP',
      dataIndex: 'psrp',
      render: (psrp: any) => (
        psrp ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      ),
    },
    {
      title: 'Life Study',
      dataIndex: 'lifestudy',
      render: (lifestudy: any) => (
        lifestudy ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      ),
    },
    {
      title: 'Cell Group',
      dataIndex: 'cellgroup',
      render: (cellgroup: any) => (
        cellgroup ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      ),
    },
    {
      title: "Lord's Day",
      dataIndex: 'lordsday',
      render: (lordsday: any) => (
        lordsday ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      ),
    },
    {
      title: 'Prophesying',
      dataIndex: 'prophesying',
      render: (prophesying: any) => (
        prophesying ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      ),
    },
    {
      title: 'Shepherding',
      dataIndex: 'sheperding',
      render: (sheperding: any) => (
        sheperding ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '0 24px', minHeight: '100vh' }}>
          <Row>
            <Col span={24}>
              <Row align="middle" style={{ marginBottom: '10px' }}>
                <label htmlFor="monthSelect" style={{ marginRight: '10px' }}>Report: </label>
                <MonthSelection
                  selectedMonth={selectedMonth}
                  handleMonthChange={handleMonthChange}
                  selectedYear={selectedYear}
                  handleYearChange={handleYearChange}
                  selectedWeek={selectedWeek}
                  handleWeekChange={handleWeekChange}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title={`Date: ${formattedStartDate} - ${formattedEndDate}`}>
                <Column {...config} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ padding: 20 }}>
                <Table dataSource={combinedData} columns={columns} />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;