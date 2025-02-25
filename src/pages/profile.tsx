
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Card,
  Typography,
  Spin,
  ConfigProvider,
  theme,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  MailOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import {
  useGetProfileDataQuery,
  useUpdateProfileMutation,
} from "../redux/Features/userManagement/userManagement.api";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/auth/authSlice";

const { Title } = Typography;

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_UPLOAD_LINK;

export function ProfilePage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const user = useAppSelector(useCurrentUser);
  const [updateProfile] = useUpdateProfileMutation(undefined);

  const { data: res, isFetching } = useGetProfileDataQuery(user?.email);
  const currentUserInfo = res?.data;

  useEffect(() => {
    loadProfile();
  }, [currentUserInfo,imageUrl]);

  const loadProfile = () => {
    if (currentUserInfo) {
      form.setFieldsValue({
        name: currentUserInfo?.name,
        imageUrl: currentUserInfo?.imageUrl,
        presentAddress: currentUserInfo?.presentAddress,
        city: currentUserInfo?.city,
      });
      setImageUrl(currentUserInfo?.imageUrl || "");
    }
    setLoading(false);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    setImageFile(file);
    return false; // Return false to prevent auto upload
  };

  const handleSubmit = async (values: any) => {
    try {
      setSubmitting(true);
      let finalImageUrl = imageUrl;

      // Upload image to Cloudinary if a new image was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        setImageUrl(response.data.secure_url)
        finalImageUrl = response.data.secure_url;
      }

      // Prepare the data for update
      const updateData = {
        ...values,
        email: currentUserInfo?.email,
        imageUrl: finalImageUrl,
      };
      console.log(updateData,340);
      const result = await updateProfile(updateData).unwrap();

      if (result?.success) {
        message.success(result.message || "Profile updated successfully");
        setImageUrl(finalImageUrl);
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update profile");
    } finally {
      setSubmitting(false);
      setImageFile(null);
    }
  };

  if (loading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#dc2626",
          borderRadius: 8,
        },
      }}
    >
      <div className="min-h-screen max-w-4xl mx-auto bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Title level={2} className="mb-6">
              Profile Settings
            </Title>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>

            <h2 className="my-4 text-2xl">Role: {currentUserInfo?.role}</h2>
            <h2 className="my-4 text-xl">{currentUserInfo?.email}</h2>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-4"
            initialValues={{
              name: currentUserInfo?.name,
              presentAddress: currentUserInfo?.presentAddress,
              city: currentUserInfo?.city,
              imageUrl: currentUserInfo?.imageUrl,
            }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="presentAddress"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                prefix={<HomeOutlined />}
                placeholder="Present Address"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="City"
                size="large"
              />
            </Form.Item>

            <Form.Item name="imageUrl" hidden>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                block
                size="large"
                className="mt-6"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
}
