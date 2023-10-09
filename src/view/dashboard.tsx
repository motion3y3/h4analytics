import '../App.css';
import { Card, Menu, Row } from 'antd';
import { Column } from '@ant-design/plots';
import 'firebase/database';
import { useEffect, useState } from 'react';
import { getAttendance } from '../utils/firebase';
import { DocumentData } from 'firebase/firestore';
import { Select } from 'antd';
import moment from 'moment-timezone';

const { Option } = Select;


function Dashboard() {

  const [attendanceData, setAttendanceData] = useState<DocumentData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  useEffect(() => {
    const getAttendanceMap = async () => {
      const attendanceMap = await getAttendance();
      setAttendanceData(attendanceMap);
    };

    getAttendanceMap();

    const getWeekOfMonth = () => {
      const now = moment().tz('Asia/Singapore'); // Replace with your desired timezone
      const firstDayOfMonth = moment(now).startOf('month');
      const firstSunday = firstDayOfMonth.clone().day(0); // Set to the first Sunday
      const weekOfMonth = now.diff(firstSunday, 'weeks') + 1;
      console.log(weekOfMonth)
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
      return [firstDayOfMonth, lastDayOfMonth];
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
  const formattedStartDate = startDate?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
  const formattedEndDate = endDate?.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });


  // Filter the attendance data based on the selected month
  const filteredData = selectedWeek !== null
    ? attendanceData.filter((attendance) => {
      const date = new Date(attendance.date);
      const [startOfWeek, endOfWeek] = getStartAndEndDate(selectedYear, selectedMonth, selectedWeek);
      console.log(startOfWeek, endOfWeek)
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

  // Update the data with attendance counts
  filteredData.forEach((attendance) => {
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

  // Ant Design chart configuration
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

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* Left Side Menu */}
      <div style={{ width: 200, backgroundColor: '#f0f0f0' }}>
        <Menu mode="vertical" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Report</Menu.Item>
          <Menu.Item key="2">Saints Namelist</Menu.Item>
          <Menu.Item key="3">Serving Ones</Menu.Item>
        </Menu>
      </div>

      {/* Content on the Right */}
      <div style={{ flex: 1, padding: 20 }}>
        <Row align="middle" style={{ marginBottom: '10px' }}>
          <label htmlFor="monthSelect" style={{ marginRight: '10px' }}>Report: </label>
          <Select
            style={{ width: 150, marginRight: '10px' }}
            placeholder="Select a week"
            onChange={handleWeekChange}
            value={selectedWeek}
          >
            <Option value={1}>Week 1</Option>
            <Option value={2}>Week 2</Option>
            <Option value={3}>Week 3</Option>
            <Option value={4}>Week 4</Option>
            <Option value={5}>Week 5</Option>
            <Option value={6}>All Week</Option>
          </Select>
          <Select
            style={{ width: 150, marginRight: '10px' }}
            placeholder="Select a month"
            onChange={handleMonthChange}
            value={selectedMonth}
          >
            <Option value={0}>January</Option>
            <Option value={1}>February</Option>
            <Option value={2}>March</Option>
            <Option value={3}>April</Option>
            <Option value={4}>May</Option>
            <Option value={5}>June</Option>
            <Option value={6}>July</Option>
            <Option value={7}>August</Option>
            <Option value={8}>September</Option>
            <Option value={9}>October</Option>
            <Option value={10}>November</Option>
            <Option value={11}>December</Option>
          </Select>
          <Select
            style={{ width: 100 }}
            placeholder="Select a year"
            onChange={handleYearChange}
            value={selectedYear}
          >
            <Option value={2023}>2023</Option>
            <Option value={2024}>2024</Option>
          </Select>
        </Row>

        <Card title={`KL Hall 4 Attendance || ${formattedStartDate} - ${formattedEndDate}`}>
          <Column {...config} />
        </Card>
      </div>
    </div>
  );

}

export default Dashboard;