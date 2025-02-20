import React from 'react';
import {
  Button,
  Card,
  InputNumber,
  Empty,
  Table,
  message,
  Divider,
} from 'antd';
import { Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearCart, removeFromCart, updateQuantity } from '../redux/Features/user/cart.api';


const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const  items  = useSelector((state: RootState) => state?.cart?.items);

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    message.success('Item removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    message.success('Cart cleared');
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <img
            src={record.image}
            alt={text}
            className="w-16 h-16 object-cover rounded mr-4"
          />
          <div>
            <h3 className="font-medium">{text}</h3>
            <p className="text-sm text-gray-500">{record.category}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price: number) => `$${Number(price)?.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value || 1)}
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (_: any, record: any) =>
        `$${((Number(record?.price) || 0) * (Number(record?.quantity) || 0)).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<Trash2 className="h-5 w-5" />}
          onClick={() => handleRemoveItem(record.id)}
        />
      ),
    },
  ];

  const total = items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty
          description="Your cart is empty"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button danger onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Table
            columns={columns}
            dataSource={items}
            rowKey="id"
            pagination={false}
          />
        </div>
        <div>
          <Card className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{total > 50 ? 'Free' : '$5.00'}</span>
              </div>
              <Divider />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(total + (total > 50 ? 0 : 5))}</span>
              </div>
              <Button type="primary" block size="large">
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;