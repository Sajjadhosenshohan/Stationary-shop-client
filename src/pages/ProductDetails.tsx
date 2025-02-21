import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  InputNumber,
  Spin,
  Tabs,
  message,
  Breadcrumb,
} from "antd";
import { ShoppingCart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetAProductDataQuery } from "../redux/Features/productManagement/productApi";
import { addToCart } from "../redux/Features/productManagement/cart.api";

const ProductDetails: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: res, isLoading } = useGetAProductDataQuery(id!);
  const product = res?.data;
  const [quantity, setQuantity] = React.useState(1);
  console.log(product, id,"product");

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
        <Link to="/products" className="text-indigo-600 hover:text-indigo-500">
          Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    message.success("Added to cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb className="mb-8">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/products">Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-indigo-600">
              ${Number(product.price).toFixed(2)}
            </span>
            <span className="ml-4 text-sm text-gray-500">
              {product.stock} in stock
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-8">
            <InputNumber
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(value) => setQuantity(value || 1)}
            />
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
