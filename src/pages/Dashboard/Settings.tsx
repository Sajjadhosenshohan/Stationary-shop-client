import React from 'react';
import { Form, Input, Button, Card, Tabs, Switch, Select } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const { Option } = Select;

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Tabs
        items={[
          {
            key: '1',
            label: 'Profile',
            children: (
              <Card>
                <Form layout="vertical" initialValues={{ ...user }}>
                  <Form.Item label="Name" name="name">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">Save Changes</Button>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
          {
            key: '2',
            label: 'Password',
            children: (
              <Card>
                <Form layout="vertical">
                  <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your current password',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your new password',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your new password',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">Change Password</Button>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
          {
            key: '3',
            label: 'Notifications',
            children: (
              <Card>
                <Form layout="vertical">
                  <Form.Item label="Email Notifications">
                    <Switch defaultChecked />
                  </Form.Item>
                  <Form.Item label="Order Updates">
                    <Switch defaultChecked />
                  </Form.Item>
                  <Form.Item label="Newsletter">
                    <Switch />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary">Save Preferences</Button>
                  </Form.Item>
                </Form>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Settings;