import React from 'react';
import { Card, Row, Col } from 'antd';
import {
  Truck,
  Package,
  HeartHandshake,
  Sparkles,
  Users,
  Clock,
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Package className="h-8 w-8 text-red-600" />,
      title: 'Quality Products',
      description:
        'We source only the finest stationery products from trusted brands worldwide.',
    },
    {
      icon: <Truck className="h-8 w-8 text-red-600" />,
      title: 'Fast Delivery',
      description:
        'Quick and reliable shipping to ensure your products reach you on time.',
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-red-600" />,
      title: 'Customer Service',
      description:
        'Dedicated support team available to assist you with any queries.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-red-600" />,
      title: 'Premium Selection',
      description:
        'Carefully curated collection of high-quality stationery items.',
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: 'Community',
      description:
        'Join our community of stationery enthusiasts and creative minds.',
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: '24/7 Support',
      description:
        'Round-the-clock customer support to address your concerns.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to StationeryShop, your premier destination for high-quality
          stationery and office supplies. We're passionate about providing the best
          products to help you stay organized and creative.
        </p>
      </div>

      <div className="mb-16">
        <div
          className="h-[400px] bg-cover bg-center rounded-lg mb-8 relative"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1497633762265-9d179a990aa6)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-red-500">Our Story</h2>
              <p className="text-lg max-w-2xl">
                Founded in 2020, we've grown from a small local shop to a trusted
                online retailer, serving customers worldwide with the finest
                stationery products.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card className="h-full">
                <div className="text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We strive to provide the highest quality stationery products while
          maintaining excellent customer service and fostering a community of
          creativity and organization.
        </p>
      </div>
    </div>
  );
};

export default About;