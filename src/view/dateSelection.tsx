// MonthSelection.tsx
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface MonthSelectionProps {
  selectedMonth: number;
  handleMonthChange: (value: number) => void;
  selectedYear: number;
  handleYearChange: (value: number) => void;
  selectedWeek: number;
  handleWeekChange: (value: number) => void;
}

const MonthSelection: React.FC<MonthSelectionProps> = ({
  selectedMonth,
  handleMonthChange,
  selectedYear,
  handleYearChange,
  selectedWeek,
  handleWeekChange,
}) => {
  return (
    <>
        <Select
            style={{ width: 150, marginRight: '10px' }}
            placeholder="Select a week"
            onChange={handleWeekChange}
            value={selectedWeek}
        >
        {Array.from({ length: 5 }, (_, index) => (
          <Option key={index + 1} value={index + 1}>
            Week {index + 1}
          </Option>
        ))}
        <Option value={6}>All Week</Option>
      </Select>
      <Select
        style={{ width: 150, marginRight: '10px' }}
        placeholder="Select a month"
        onChange={handleMonthChange}
        value={selectedMonth}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <Option key={index} value={index}>
            {new Date(2022, index, 1).toLocaleString('default', { month: 'long' })}
          </Option>
        ))}
      </Select>
      <Select
        style={{ width: 100, marginRight: '10px' }}
        placeholder="Select a year"
        onChange={handleYearChange}
        value={selectedYear}
      >
        <Option value={2023}>2023</Option>
        <Option value={2024}>2024</Option>
        {/* Add more years as needed */}
      </Select>
      
    </>
  );
};

export default MonthSelection;
