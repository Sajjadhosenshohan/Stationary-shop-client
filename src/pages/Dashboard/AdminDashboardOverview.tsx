import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { ShoppingBag, Package, DollarSign } from "lucide-react";
import { useCurrentUser } from "../../redux/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetAdminOrdersDataQuery } from "../../redux/Features/OrderManagement/orderApi";
import { TOrder } from "../../types";

const AdminDashboardOverview: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const { data: res } = useGetAdminOrdersDataQuery(user?.email, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const orders = res?.data;
  const calculateOrderStats = (orders: TOrder[]) => {
    return orders?.reduce(
      (acc, order) => {
        const orderTotal = order?.products?.reduce(
          (sum, product) => sum + product?.price,
          0
        );

        acc.totalOrders += 1;
        acc.totalProducts += order?.products?.length;
        acc.totalRevenue += orderTotal;

        return acc;
      },
      { totalOrders: 0, totalProducts: 0, totalRevenue: 0 }
    );
  };

  const orderStats = calculateOrderStats(orders);

  return (
    <div>
      <h1 className="text-2xl font-bold my-12">Admin Dashboard Overview</h1>
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
              title="Total Revenue"
              value={orderStats?.totalRevenue}
              prefix={<DollarSign className="h-5 w-5 text-blue-600" />}
            />
          </Card>
        </Col>
        
      </Row>
    </div>
  );
};

export default AdminDashboardOverview;
