import React from 'react';
import { Card, Button, Empty, Row, Col } from 'antd';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const wishlistItems = [
    {
      id: '1',
      title: 'Premium Notebook',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
    },
    // Add more items as needed
  ];

  if (wishlistItems.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <Empty
          description="Your wishlist is empty"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Link to="/products">
            <Button type="primary">Browse Products</Button>
          </Link>
        </Empty>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <Row gutter={[16, 16]}>
        {wishlistItems.map((item) => (
          <Col xs={24} sm={12} lg={8} key={item.id}>
            <Card
              cover={
                <img
                  alt={item.title}
                  src={item.image}
                  className="h-48 object-cover"
                />
              }
              actions={[
                <Button
                  type="text"
                  icon={<ShoppingCart className="h-4 w-4" />}
                  key="add"
                >
                  Add to Cart
                </Button>,
                <Button
                  type="text"
                  danger
                  icon={<Trash2 className="h-4 w-4" />}
                  key="remove"
                >
                  Remove
                </Button>,
              ]}
            >
              <Card.Meta
                title={item.title}
                description={<span className="text-red-600">${item.price}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Wishlist;