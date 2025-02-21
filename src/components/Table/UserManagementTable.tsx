import React from 'react';
import { Table, Tag, Button, Space, Select, Tooltip } from 'antd';
import { Mail, UserCog, Shield, Ban, CheckCircle } from 'lucide-react';


interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

interface UserManagementTableProps {
  users: User[];
  loading: boolean;
  onActivate: (id: string) => Promise<void>;
  onDeactivate: (id: string) => Promise<void>;
  onRoleChange: (role: string, email: string) => Promise<void>;
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  loading,
  onActivate,
  onDeactivate,
  onRoleChange,
}) => {
  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div className="flex items-center gap-2">
          <UserCog className="h-4 w-4 text-gray-500" />
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{email}</span>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: User) => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-gray-500" />
          <Select
            value={role}
            style={{ width: 120 }}
            onChange={(value) => onRoleChange(value, record.email)}
            options={roleOptions}
            className="capitalize"
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isBlocked',
      key: 'isBlocked',
      render: (isBlocked: boolean) => (
        <Tag 
          icon={isBlocked ? <Ban className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
          color={isBlocked ? 'error' : 'success'}
          className="flex items-center gap-1 w-fit"
        >
          {isBlocked ? 'Blocked' : 'Active'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: User) => (
        <Space>
          {record.isBlocked ? (
            <Tooltip title="Activate Account">
              <Button
                type="primary"
                onClick={() => onActivate(record._id)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500"
                icon={<CheckCircle className="h-4 w-4" />}
              >
                Activate
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Deactivate Account">
              <Button
                danger
                onClick={() => onDeactivate(record._id)}
                icon={<Ban className="h-4 w-4" />}
              >
                Deactivate
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="_id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} users`,
      }}
    />
  );
};

export default UserManagementTable;