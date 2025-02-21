import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Upload } from "antd";
import { PlusCircle, UploadIcon } from "lucide-react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import PHSelect from "../../components/form/PHSelect";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductDataQuery,
} from "../../redux/Features/productManagement/productApi";
import PHTextArea from "../../components/form/PHTextArea";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/auth/authSlice";
import axios from "axios";

const Products: React.FC = () => {
  const [addProduct] = useAddProductMutation();
  const { data: response, isFetching } = useGetAllProductDataQuery(undefined);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]); // State to hold products
  const currentUser = useAppSelector(useCurrentUser);
  const Products = response?.data?.result;

  const category = [
    { label: "Pen", value: "pen" },
    { label: "Book", value: "book" },
    { label: "Notes", value: "notes" },
  ];

  const handleImageChange = (info: any) => {
    setImageFile(info.file);
  };
  console.log(Products, 18);

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading(
      editingProduct ? "Updating..." : "Creating..."
    );
    try {
      let imageUrl = editingProduct?.imageUrl || "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "mern_product");
        formData.append("cloud_name", "djzt5tkwu");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/djzt5tkwu/image/upload",
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
        const update = await updateProduct({
          productId: editingProduct._id,
          productInfo: {
            ...productData,
          },
        });
        console.log(update, "update");
        toast.success("Product updated successfully", { id: toastId });
      } else {
        await addProduct(productData);
        toast.success("Product created successfully", { id: toastId });
      }

      setIsModalVisible(false);
      setEditingProduct(null); // Reset editing state
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduct(id);
      console.log("handle deleted", res)
      // setProducts(products.filter((product) => product._id !== id)); // Remove from local state
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
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
    { title: "Number of Books", dataIndex: "numberOfBooks" },
    {
      title: "Actions",
      render: (product: any) => (
        <>
          <Button type="link" onClick={() => handleEdit(product)}>
            Update
          </Button>
          <Button type="link" danger onClick={() => handleDelete(product._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  // useEffect(() => {
  //   // Fetch products from API or store them
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/v1/product/"); // Replace with your API call
  //       console.log('useEffect', response)
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          type="primary"
          icon={<PlusCircle className="h-4 w-4" />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Product
        </Button>
      </div>

      <Table columns={columns} dataSource={Products} rowKey="_id" />

      <Modal
        title={editingProduct ? "Update Product" : "Add Product"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput
            type="text"
            name="title"
            label="Title"
            defaultValue={editingProduct?.title}
          />
          <PHInput
            type="number"
            name="numberOfBooks"
            label="Number Of Books"
            defaultValue={editingProduct?.numberOfBooks}
          />
          <PHInput
            type="number"
            name="price"
            label="Price"
            defaultValue={editingProduct?.price}
          />
          <PHTextArea
            name="description"
            label="Description"
            defaultValue={editingProduct?.description}
          />
          <PHSelect
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
        </PHForm>
      </Modal>
    </div>
  );
};

export default Products;
