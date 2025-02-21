import React from 'react';
import { Table, Tag, Button, Space, Card } from 'antd';
import { Eye } from 'lucide-react';

const Orders: React.FC = () => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'delivered'
            ? 'green'
            : status === 'shipping'
            ? 'blue'
            : 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="link" icon={<Eye className="h-4 w-4" />}>
          View
        </Button>
      ),
    },
  ];

  const data = [
    {
      id: '#1234',
      date: '2024-03-15',
      customer: 'John Doe',
      total: 125.99,
      status: 'pending',
    },
    {
      id: '#1235',
      date: '2024-03-14',
      customer: 'Jane Smith',
      total: 89.99,
      status: 'shipping',
    },
    {
      id: '#1236',
      date: '2024-03-13',
      customer: 'Bob Johnson',
      total: 199.99,
      status: 'delivered',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Space>
          <Button type="primary">Export</Button>
        </Space>
      </div>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default Orders;