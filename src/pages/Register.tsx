import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";
import { TUser } from "../types/auth.type";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      console.log("1 response >>", data);
      const response = await register(data);
      console.log("2 response >>", response);
      console.log(response?.data?.data)
      if (response?.data?.success === true) {
        const user = verifyToken(response?.data?.data?.accessToken) as TUser;
        message.success(response?.data?.message);
        dispatch(
          setCredentials({ user: user, token: response?.data?.data?.accessToken })
        );
        navigate("/");
      }
      else if(response?.error?.data?.success === false) {
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
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600">
            Join us to start shopping for stationery
          </p>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input size="large" placeholder="Enter your name" />
          </Form.Item>

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

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
