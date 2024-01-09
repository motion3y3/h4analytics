// ReportSection.tsx
import React from 'react';
import { Row, Col, Card } from 'antd';
import { Column } from '@ant-design/plots';
import MonthSelection from './dateSelection';

interface ReportSectionProps {
  selectedMonth: number;
  handleMonthChange: (value: number) => void;
  selectedYear: number;
  handleYearChange: (value: number) => void;
  selectedWeek: number;
  handleWeekChange: (value: number) => void;
  formattedStartDate?: string | null;
  formattedEndDate?: string | null;
  data: any[]; // Adjust the type according to your data structure
}

const ReportSection: React.FC<ReportSectionProps> = ({
  selectedMonth,
  handleMonthChange,
  selectedYear,
  handleYearChange,
  selectedWeek,
  handleWeekChange,
  formattedStartDate,
  formattedEndDate,
  data,
}) => {
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
      <Col span={24}>
        <Card title={`Date: ${formattedStartDate} - ${formattedEndDate}`}>
          <Column {...config} />
        </Card>
      </Col>
    </Row>
  );
};

export default ReportSection;
