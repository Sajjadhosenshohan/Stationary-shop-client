/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Input, Select, Empty, Spin, Row, Col, Space } from "antd";
import { Search } from "lucide-react";
import { useGetAllProductDataQuery } from "../redux/Features/productManagement/productApi";
import ProductCard from "../components/common/ProductCard";
import { TOrderProduct, TQueryParam } from "../types";
import { allProductsCategories } from "../constants/global";

// const { Option } = Select;

const Products: React.FC = () => {
  // // State for search, filters, sorting, and pagination
  // const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("all");
  // const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  // const [sort, setSort] = useState<string>(""); // e.g., "price" or "-price"
  // const [page, setPage] = useState(1); // Current page
  // const [limit, setLimit] = useState(10); // Items per page
  // const [availability, setAvailability] = useState<boolean | undefined>(
  //   undefined
  // ); // Filter by stock

  // // Query object for the API
  // const query = {
  //   search: search || undefined,
  //   category: category === "all" ? undefined : category,
  //   minPrice: priceRange[0],
  //   maxPrice: priceRange[1],
  //   sort: sort || undefined,
  //   page,
  //   limit,
  //   isAvailable: availability, // Assuming backend supports this field
  // };

  // const products = response?.data?.result || [];
  // const meta = response?.data?.meta || { total: 0, page: 1, limit: 10 };

  // // Categories list
  // const categories = [
  //   "all",
  //   "writing",
  //   "paper",
  //   "art supplies",
  //   "office supplies",
  //   "school supplies",
  // ];
  // // export const category = [
  // //   { label: "All", value: "all" },
  // //   { label: "writing", value: "writing" },
  // //   { label: "paper", value: "paper" },
  // //   { label: "art supplies", value: "art supplies" },
  // //   { label: "office supplies", value: "office supplies" },
  // //   { label: "school supplies", value: "school supplies" },
  // // ];
  // // Sort options
  // const sortOptions = [
  //   { label: "Default", value: "" },
  //   { label: "Price: Low to High", value: "price" },
  //   { label: "Price: High to Low", value: "-price" },
  // ];

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  // const { data: bicycleData } = useGetAllBicycleQuery(params);
  // const { data: specificField } = useGetSpecificBicycleFieldsQuery(undefined);
  const { data: response, isLoading } = useGetAllProductDataQuery(params);

  // Handle Filter
  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    console.log(e);
    const { name, value } = e.target;

    setParams((prevParams) => {
      const updatedParams = prevParams ? [...prevParams] : [];
      const filterParams = updatedParams.filter((param) => param.name !== name);
  
      if (name === "minPrice" || name === "maxPrice") {
        const priceRangeParam = {
          name: name === "minPrice" ? "minPrice" : "maxPrice",
          value: Number(value),
        };
        filterParams.push(priceRangeParam);
      } else if (name === "availability") {
        filterParams.push({ name, value });
      } else {
        filterParams.push({ name, value });
      }
  
      return filterParams;
    });
  };

  const products = response?.data?.result;
  const meta = response?.data?.meta;
  // console.log("res",products)
  // console.log("meta",meta)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        {/* Filters and Search */}

        <div className="w-full flex flex-wrap gap-5 space-y-4">
          {/* Search Input */}
          <div>
            <Input
              placeholder="Search by title, author, or category..."
              prefix={<Search className="h-5 w-5 text-gray-400" />}
              // value={search}
              name="searchTerm"
              onChange={handleChangeFilter}
              // onChange={(e) => {
              //   handleChangeFilter(e.target.value);
              //   // setPage(1); // Reset to first page on search
              // }}
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              name="category"
              onChange={handleChangeFilter}
              id=""
              className="focus:outline-none focus:border focus:border-primary p-2"
            >
              <option disabled selected>
                Filter By Category
              </option>
              {allProductsCategories?.map((item, idx) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}

          {/* Availability Filter */}
          <div className="border-red-500 text-red-500">
            <select name="availability" onChange={handleChangeFilter} id="">
              <option disabled selected>
                Filter By Availability
              </option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out Of Stock</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Min Price"
              name="minPrice"
              onChange={handleChangeFilter}
            />
            <Input
              type="number"
              placeholder="Max Price"
              name="maxPrice"
              onChange={handleChangeFilter}
            />
          </div>
          {/* Sort Options */}
          {/* <div>
                <h2>Filter By price high to low</h2>
                <Select
                  className="w-full"
                  value={sort}
                  onChange={(value) => {
                    setSort(value);
                    setPage(1); // Reset to first page
                  }}
                  placeholder="Sort by"
                >
                  {sortOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div> */}
        </div>

        {/* Product List */}
        <Col xs={24} sm={12} md={16} lg={18}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : !products.length ? (
            <Empty description="No products found" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: TOrderProduct) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {/* <div className="mt-6 flex justify-center">
                  <Pagination
                    current={meta.page}
                    total={meta.total}
                    pageSize={meta.limit}
                    onChange={(newPage, newPageSize) => {
                      setPage(newPage);
                      setLimit(newPageSize);
                    }}
                    showSizeChanger
                    pageSizeOptions={["10", "20", "50"]}
                  />
                </div> */}
            </>
          )}
        </Col>
      </div>
    </div>
  );
};

export default Products;
