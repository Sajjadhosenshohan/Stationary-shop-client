/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Input, Empty, Spin, Col } from "antd";
import { Search } from "lucide-react";
import { useGetAllProductDataQuery } from "../redux/Features/productManagement/productApi";
import ProductCard from "../components/common/ProductCard";
import { TOrderProduct, TQueryParam } from "../types";
import { allProductsCategories } from "../constants/global";

const AllProducts: React.FC = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: response, isLoading } = useGetAllProductDataQuery(params);

  // Handle Filter
  const handleChangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setParams((prevParams) => {
      const updatedParams = prevParams ? [...prevParams] : [];
      const filterParams = updatedParams?.filter((param) => param.name !== name);

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


        <h1 className="text-3xl font-bold my-12">All Products</h1>

        {/* Filters and Search */}

          <div className="flex justify-center items-center">
            {/* Search Input */}
            <div>
              <Input
                placeholder="Search by title, author, or category..."
                prefix={<Search className="h-5 w-5 text-gray-400" />}
                // value={search}
                name="searchTerm"
                className="border border-neutral-300 rounded h-10 focus:outline-none  focus:text-red-500  focus:border-red-500 hover:text-red-500 hover:border-red-500"
                onChange={handleChangeFilter}
                // onChange={(e) => {
                //   handleChangeFilter(e.target.value);
                //   // setPage(1); // Reset to first page on search
                // }}
              />
            </div>
          </div>
        <div className="w-full flex items-center justify-center">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center justify-center mt-8 mb-10 ">
            {/* Category Filter */}
            <div>
              <select
                name="category"
                onChange={handleChangeFilter}
                id=""
                className="border border-neutral-300 rounded p-2 focus:outline-none  focus:text-red-500  focus:border-red-500 hover:text-red-500 hover:border-red-500"
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

            {/* Availability Filter */}
            <div>
              <select
                name="availability"
                onChange={handleChangeFilter}
                id=""
                className="border border-neutral-300 rounded p-2 focus:outline-none  focus:text-red-500  focus:border-red-500 hover:text-red-500 hover:border-red-500"
              >
                <option disabled selected>
                  Filter By Availability
                </option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out Of Stock</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <input
                type="number"
                placeholder=" Min Price"
                name="minPrice"
                className="border border-neutral-300 rounded h-10 focus:outline-none  focus:text-red-500  focus:border-red-500 hover:text-red-500 hover:border-red-500"
                onChange={handleChangeFilter}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder=" Max Price"
                className="border border-neutral-300 rounded h-10 focus:outline-none  focus:text-red-500  focus:border-red-500 hover:text-red-500 hover:border-red-500"
                name="maxPrice"
                onChange={handleChangeFilter}
              />
            </div>
          </div>
        </div>

        {/* Product List */}
        <Col xs={24} sm={12} md={16} lg={18}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : !products?.length ? (
            <Empty description="No products found" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product: TOrderProduct) => (
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

export default AllProducts;
