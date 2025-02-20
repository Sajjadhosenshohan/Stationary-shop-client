import React from 'react';
import { Card, Button, message } from 'antd';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/Features/user/cart.api';
import { useAppDispatch } from '../../redux/hooks';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    message.success('Added to cart');
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product?.title}
          src={product?.image}
          className="h-48 w-full object-cover"
        />
      }
      className="h-full flex flex-col"
    >
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product?.title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{product?.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-indigo-600">
            ${product?.price}
          </span>
          <div className="space-x-2">
            <Link to={`/products/${product?.id}`}>
              <Button type="link">View Details</Button>
            </Link>
            <Button
              type="primary"
              icon={<ShoppingCart className="h-4 w-4" />}
              onClick={handleAddToCart}
              disabled={product?.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;