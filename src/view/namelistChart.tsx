import React from 'react';
import { Table } from 'antd';

const SimpleTable: React.FC = () => {
    // Sample data (replace with your data)
    const data = [
        { key: '1', name: 'John Doe', age: 25, address: '123 Main St' },
        { key: '2', name: 'Jane Smith', age: 30, address: '456 Elm St' },
        // Add more data here
    ];

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
    ];

    return (
        <div>
            <Table dataSource={data} columns={columns} />
        </div>
    );
};

export default SimpleTable;
