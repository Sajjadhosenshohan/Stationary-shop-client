import React from "react";
import { Card, Button, message } from "antd";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/Features/productManagement/cart.api";
import { useAppDispatch } from "../../redux/hooks";
import { TOrderProduct } from "../../types";

interface ProductCardProps {
  product: TOrderProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    message.success("Added to cart");
  };

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
      className="h-full flex flex-col"
    >
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
              

              <Button color="danger" variant="filled">
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
