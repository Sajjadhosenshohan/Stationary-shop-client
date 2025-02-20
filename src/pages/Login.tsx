import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/auth/authApi';
import { setCredentials } from '../redux/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { TUser } from '../types';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values).unwrap();
      // console.log(response, "login")
      dispatch(setCredentials(response));
      message.success('Login successful');
      navigate('/');

      const result = await login(values).unwrap();
      // console.log("Login : ", result);

      const user = verifyToken(result.data.accessToken) as TUser;
      console.log("user => ,", result);
      if (result?.success) {
        toast.success("Login Successfully..", {
          // id: toastId,
          duration: 2000,
        });
      }
      dispatch(setCredentials({ user: user, token: result.data.accessToken }));
      navigate("/");


    } catch (error) {
      message.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Please sign in to your account to continue
          </p>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
            >
              Sign in
            </Button>
          </Form.Item>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
                Register now
              </Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;