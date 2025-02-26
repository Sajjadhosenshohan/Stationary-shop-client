import React, { useState } from "react";
import { Form, Input, Button, Card, message, Upload } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";
import { TUser } from "../types/auth.type";
import { verifyToken } from "../utils/verifyToken";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_UPLOAD_LINK;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      message.error("Image upload failed!");
      return null;
    }
  };

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const uploadedImageUrl = await handleImageUpload();
        if (uploadedImageUrl) finalImageUrl = uploadedImageUrl;
      }

      const data = { ...values, imageUrl: finalImageUrl };
      const response = await register(data);

      if (response?.data?.success) {
        const user = verifyToken(response?.data?.data?.accessToken) as TUser;
        message.success(response?.data?.message);
        dispatch(
          setCredentials({ user, token: response?.data?.data?.accessToken })
        );
        navigate("/");
      } else {
        message.error(response?.error?.data?.message || "Registration failed!");
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
            Register Now
          </h2>
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
                  if (!value || getFieldValue("password") === value)
                    return Promise.resolve();
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item label="Profile Picture">
            <div>
              <Upload
                beforeUpload={(file) => {
                  setImageFile(file);
                  return false;
                }}
                showUploadList={false}
              >
                <Button className="block" icon={<UploadOutlined />}>Upload Profile Image</Button>
              </Upload>
            </div>
            {imageFile && (
              <p className="text-green-600 mt-2">
                File selected: {imageFile.name}
              </p>
            )}
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
              <Link to="/login" className="text-red-600 hover:text-red-500">
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
