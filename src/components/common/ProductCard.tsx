import React from "react";
import { Card, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import { TOrderProduct } from "../../types";
import { SearchOutlined } from "@ant-design/icons";

interface ProductCardProps {
  product: TOrderProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={product?.title}
          src={product?.imageUrl}
          className="h-48 w-full object-cover"
        />
      }
      className="h-full flex flex-col relative"
    >
      {product?.availability === "in-stock" ? (
        <div className=" absolute top-44 right-0">
          <Badge.Ribbon text="In stock" color="#6EC531"></Badge.Ribbon>
        </div>
      ) : (
        <div className=" absolute top-44 right-0">
          <Badge.Ribbon text="Out of stock" color="red"></Badge.Ribbon>
        </div>
      )}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product?.title}</h3>

        <p className="text-gray-600 mb-2 line-clamp-2">
          {product?.description}
        </p>

        <div className="mt-4">
          <h3 className="  mb-1">
            <span className="font-medium">Category :</span> {product?.category}
          </h3>
          <h3 className="  mb-1">
            <span className="font-medium">Author By :</span>{" "}
            {product?.authorName}
          </h3>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-red-600">
            ${product?.price}
          </span>
          <div className="space-x-2">
            <Link to={`/products/${product?._id}`}>
              <Button type="primary" icon={<SearchOutlined />}>
                View details
              </Button>
            </Link>
            {/* <Button
              type="primary"
              icon={<ShoppingCart className="h-4 w-4" />}
              onClick={handleAddToCart}
              disabled={product?.stock === 0}
            >
              Add to Cart
            </Button> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
