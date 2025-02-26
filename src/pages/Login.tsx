import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/auth/authApi";
import { setCredentials } from "../redux/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../types/auth.type";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (data: { email: string; password: string }) => {
    try {
    
      const response = await login (data);
      if (response?.data?.success === true) {
        const user = verifyToken(response?.data?.data?.accessToken) as TUser;
        message.success(response?.data?.message);
        dispatch(
          setCredentials({
            user: user,
            token: response?.data?.data?.accessToken,
          })
        );
        navigate("/");
      } else if (response?.error?.data?.success === false) {
        message.error(response?.error?.data?.message);
      }
    } catch (error) {
      message.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>
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
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-500"
              >
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
