import React from 'react';
import { Table, Tag, Button, Card } from 'antd';
import { Eye } from 'lucide-react';

const OrderHistory: React.FC = () => {
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
          View Details
        </Button>
      ),
    },
  ];

  const data = [
    {
      id: '#1234',
      date: '2024-03-15',
      total: 125.99,
      status: 'delivered',
    },
    {
      id: '#1235',
      date: '2024-03-14',
      total: 89.99,
      status: 'shipping',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default OrderHistory;