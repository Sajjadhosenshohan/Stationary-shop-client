import React from 'react';
import { Card, Button, Form, Input, Select, Row, Col } from 'antd';
import { CreditCard, Plus } from 'lucide-react';

const { Option } = Select;

const PaymentMethods: React.FC = () => {
  const savedCards = [
    {
      id: '1',
      last4: '4242',
      brand: 'visa',
      expMonth: 12,
      expYear: 2024,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Saved Cards</h2>
        <Row gutter={[16, 16]}>
          {savedCards.map((card) => (
            <Col xs={24} sm={12} lg={8} key={card.id}>
              <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="flex justify-between items-start">
                  <CreditCard className="h-8 w-8" />
                  <span className="capitalize">{card.brand}</span>
                </div>
                <div className="mt-4">
                  <div className="text-lg">•••• •••• •••• {card.last4}</div>
                  <div className="text-sm mt-2">
                    Expires {card.expMonth}/{card.expYear}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Add New Card</h2>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[{ required: true, message: 'Please enter card number' }]}
              >
                <Input placeholder="1234 5678 9012 3456" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: 'Please select expiry date' }]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[{ required: true, message: 'Please enter CVV' }]}
              >
                <Input placeholder="123" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Name on Card"
                name="nameOnCard"
                rules={[{ required: true, message: 'Please enter name on card' }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" icon={<Plus className="h-4 w-4" />}>
            Add Card
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentMethods;