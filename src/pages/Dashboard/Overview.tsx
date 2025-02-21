import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={150}
              prefix={<ShoppingBag className="h-5 w-5 text-indigo-600" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={75}
              prefix={<Package className="h-5 w-5 text-green-600" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={15000}
              prefix={<DollarSign className="h-5 w-5 text-blue-600" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Growth"
              value={25}
              suffix="%"
              prefix={<TrendingUp className="h-5 w-5 text-red-600" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Add more dashboard widgets here */}
    </div>
  );
};

export default Overview;