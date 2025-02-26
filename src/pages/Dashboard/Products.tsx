import React, { useState } from "react";
import { Modal, Button, Table, Form, Upload, Tag } from "antd";
import { PlusCircle, UploadIcon } from "lucide-react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductDataQuery,
} from "../../redux/Features/productManagement/productApi";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/auth/authSlice";
import axios from "axios";
import { category } from "../../constants/global";
import EliteInput from "../../components/form/EliteInput";
import EliteTextArea from "../../components/form/EliteTextArea";
import EliteSelect from "../../components/form/EliteSelect";
import EliteForm from "../../components/form/EliteForm";

const Products: React.FC = () => {
  const [addProduct] = useAddProductMutation();
  const { data: response, isFetching } = useGetAllProductDataQuery(undefined);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const currentUser = useAppSelector(useCurrentUser);
  const products = response?.data?.result;

  const handleImageChange = (info: any) => {
    setImageFile(info.file);
  };

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading(
      editingProduct ? "Updating..." : "Creating..."
    );
    try {
      let imageUrl = editingProduct?.imageUrl || "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
        const response = await axios.post(
          import.meta.env.VITE_UPLOAD_LINK,
          formData
        );
        imageUrl = response.data.secure_url;
      }

      const productData = {
        ...data,
        imageUrl,
        authorName: currentUser?.name,
        authorEmail: currentUser?.email,
        isDeleted: false,
        isAvailable: true,
      };

      if (editingProduct) {
        await updateProduct({
          productId: editingProduct._id,
          productInfo: productData,
        });
        toast.success("Product updated successfully", { id: toastId });
      } else {
        await addProduct(productData);
        toast.success("Product created successfully", { id: toastId });
      }

      setIsModalVisible(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (imageUrl: string) => (
        <img src={imageUrl} alt="Product" style={{ width: "50px" }} />
      ),
    },
    { title: "Title", dataIndex: "title" },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: any) => <Tag color="green">{price}</Tag>,
    },
    { title: "Category", dataIndex: "category" },
    {
      title: "Number of Books",
      dataIndex: "numberOfProduct",
      render: (numberOfProduct: any) => (
        <Tag color="blue">{numberOfProduct}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (product: any) => (
        <div className="flex gap-5">
          <Button
            color="green"
            variant="outlined"
            onClick={() => handleEdit(product)}
          >
            Update
          </Button>
          <Button danger onClick={() => handleDelete(product._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center my-12">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          type="primary"
          icon={<PlusCircle className="h-4 w-4" />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Product
        </Button>
      </div>
      <div className="w-full overflow-x-auto  bg-white">
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          loading={isFetching}
          scroll={{ x: "max-content" }}
        />
      </div>
      <Modal
        title={editingProduct ? "Update Product" : "Add Product"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <EliteForm onSubmit={handleSubmit}>
          <EliteInput
            type="text"
            name="title"
            label="Title"
            defaultValue={editingProduct?.title}
          />
          <EliteInput
            type="number"
            name="numberOfProduct"
            label="Number Of Product"
            defaultValue={editingProduct?.numberOfProduct}
          />
          <EliteInput
            type="number"
            name="price"
            label="Price"
            defaultValue={editingProduct?.price}
          />
          <EliteTextArea
            name="description"
            label="Description"
            defaultValue={editingProduct?.description}
          />
          <EliteSelect
            name="category"
            label="Category"
            options={category}
            defaultValue={editingProduct?.category}
          />
          <Form.Item name="image" label="Image">
            <Upload
              listType="picture-card"
              showUploadList={true}
              beforeUpload={() => false}
              onChange={handleImageChange}
            >
              <div className="flex flex-col items-center">
                <UploadIcon className="h-5 w-5" />
                <div className="mt-2">Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingProduct ? "Update Product" : "Save Product"}
          </Button>
        </EliteForm>
      </Modal>
    </div>
  );
};

export default Products;
