import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { ShoppingBag, Package, DollarSign } from "lucide-react";
import { useCurrentUser } from "../../redux/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserOrdersDataQuery } from "../../redux/Features/OrderManagement/orderApi";
import { TOrder } from "../../types";

const UserDashboardOverview: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: res } = useGetUserOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const orders = res?.data;
  console.log(orders, 17)
  const calculateOrderStats = (orders: TOrder[]) => {
    return orders?.reduce(
      (acc, order) => {
        const orderTotal = order?.products?.reduce(
          (sum, product) => sum + product?.price,
          0
        );

        acc.totalOrders += 1;
        acc.totalProducts += order?.products?.length;
        acc.totalSpent += orderTotal;

        return acc;
      },
      { totalOrders: 0, totalProducts: 0, totalSpent: 0 }
    );
  };

  const orderStats = calculateOrderStats(orders);
  console.log(orderStats);

  return (
    <div>
      <h1 className="text-2xl font-bold my-12">Dashboard Overview</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={orderStats?.totalOrders}
              prefix={<ShoppingBag className="h-5 w-5 text-indigo-600" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={orderStats?.totalProducts}
              prefix={<Package className="h-5 w-5 text-green-600" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Spent"
              value={orderStats?.totalSpent}
              prefix={<DollarSign className="h-5 w-5 text-blue-600" />}
            />
          </Card>
        </Col>
        
      </Row>

      {/* Add more dashboard widgets here */}
    </div>
  );
};

export default UserDashboardOverview;
