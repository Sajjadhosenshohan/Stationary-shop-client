import React, { useState } from "react";
import { Input, Select, Slider, Empty, Spin, Row, Col, Space } from "antd";
import { Search } from "lucide-react";
import { useGetAllProductDataQuery } from "../redux/Features/productManagement/productApi";
import ProductCard from "../components/common/ProductCard";
import { Product } from "../types";

const { Option } = Select;

const Products: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const { data: response, isLoading } = useGetAllProductDataQuery(
    //   {
    //   search,
    //   category: category === 'all' ? undefined : category,
    //   minPrice: priceRange[0],
    //   maxPrice: priceRange[1],
    // }
    undefined
  );

  const products = response?.data?.result;
  
  console.log(products, "products");
  const categories = [
    "all",
    "writing",
    "paper",
    "art supplies",
    "office supplies",
    "school supplies",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <Row gutter={24}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" className="w-full">
              <Input
                placeholder="Search products..."
                prefix={<Search className="h-5 w-5 text-gray-400" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                className="w-full"
                value={category}
                onChange={setCategory}
                placeholder="Select category"
              >
                {categories?.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Option>
                ))}
              </Select>
              <div>
                <p className="mb-2">Price Range</p>
                <Slider
                  range
                  min={0}
                  max={1000}
                  value={priceRange}
                  onChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={16} lg={18}>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : !products?.length ? (
              <Empty description="No products found" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product: Product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Products;
