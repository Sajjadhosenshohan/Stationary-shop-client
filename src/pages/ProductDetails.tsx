import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Spin,
  Tabs,
  message,
  Breadcrumb,
  Tag,
} from "antd";
import { ShoppingCart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAProductDataQuery } from "../redux/Features/productManagement/productApi";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const { data: res, isLoading } = useGetAProductDataQuery(id!);
  const product = res?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link to="/products" className="text-red-600 hover:text-red-500">
          Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    message.success("Added to cart");
    navigate("/cart")
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-12">
      <Breadcrumb className="mb-12">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/products">Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-[400px] md:h-[500px]">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <div className="flex items-center gap-5 mb-10">
            <span className="text-2xl font-semibold text-red-500">
              ${Number(product.price).toFixed(2)}
            </span>
            <span>
              {product?.availability === "in-stock" ? (
                <Tag color="success">{product?.availability}</Tag>
              ) : (
                <Tag color="warning">{product?.availability}</Tag>
              )}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-8">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCart className="h-5 w-5" />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
          <Card className="mb-8">
            <div className="flex items-center text-gray-600">
              <Package className="h-5 w-5 mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>
          </Card>
          <Tabs
            items={[
              {
                key: "1",
                label: "Description",
                children: <p>{product.description}</p>,
              },
              {
                key: "2",
                label: "Specifications",
                children: (
                  <ul className="list-disc pl-4">
                    <li>Category: {product.category}</li>
                    <li>Brand: Premium Stationery</li>
                    <li>Material: High-quality materials</li>
                  </ul>
                ),
              },
              {
                key: "3",
                label: "Shipping",
                children: (
                  <div>
                    <p>Standard shipping: 3-5 business days</p>
                    <p>Express shipping: 1-2 business days</p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
