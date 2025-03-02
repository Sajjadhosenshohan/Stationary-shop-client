import React, { useState } from "react";
import { Table, Tag, Button, Card, Image, Tooltip, Modal, Select } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/auth/authSlice";
import {
  useChangeOrderStatusMutation,
  useDeleteOrderMutation,
  useGetAdminOrdersDataQuery,
} from "../../redux/Features/OrderManagement/orderApi";
import { toast } from "sonner";
import { TOrder, TUserInfo } from "../../types";
import { ChevronDown, ChevronRight, Divide } from "lucide-react";
import { orderStatusOptions } from "../../constants/global";

const Orders: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const [deleteOrder] = useDeleteOrderMutation();
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const { data: res, isFetching } = useGetAdminOrdersDataQuery( {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  console.log(res, "orders")
  // modal related
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedInfo, setDeletedInfo] = useState({
    id: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const result = await deleteOrder(deletedInfo).unwrap();
    toast.success(result.message);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // table related data
  const orders = res?.data?.map((order: TOrder) => ({
    ...order,
    key: order?._id,
    date: new Date().toLocaleDateString(),
  }));
  const handleDeleteOrder = async (orderId: string) => {
    const orderInfo = { id: orderId };
    try {
      setDeletedInfo(orderInfo);
      showModal();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  
  const handleOrderStatus = async (id: string, newStatus: string) => {
    const updateInfo = {
      id,
      orderStatus: newStatus,
    };

    try {
      
      const result = await changeOrderStatus(updateInfo).unwrap();
      toast.success(result.message); // Show success toast message
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  const expandedRowRender = (record: TOrder) => {
    const productColumns = [
      {
        title: "Image",
        dataIndex: "imageUrl",
        key: "imageUrl",
        width: 120,
        render: (imageUrl: string) => (
          <Image
            src={imageUrl}
            alt="Product"
            width={80}
            height={80}
            className="object-cover rounded-lg"
          />
        ),
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (title: string) => <span className="font-medium">{title}</span>,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (description: string) => (
          <p className="text-gray-600 line-clamp-2">{description}</p>
        ),
      },
      {
        title: "Buyer Name",
        key: "buyerName",
        render: (_: any, productRecord: any) => (
          <span className="text-gray-600">
            {productRecord.buyerName || "Unknown"}
          </span>
        ),
      },
      {
        title: "Buyer Email",
        key: "Buyer Email",
        render: (_:any, productRecord: any) => {
          console.log(productRecord)
          return <Tag color="blue">{productRecord.buyerEmail || "Unknown"}</Tag>
        },
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: 120,
        render: (price: number) => (
          <Tag color="green" className="font-medium">
            ${Number(price).toFixed(2)}
          </Tag>
        ),
      },
    ];

    const modifiedProducts = record.products.map((product) => ({
      ...product,
      buyerName: record.userInfo.name,
      buyerEmail: record.userInfo.email
    }));

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Order Products</h3>
        <Table
          columns={productColumns}
          dataSource={modifiedProducts}
          pagination={false}
          rowKey="_id"
          className="nested-table"
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (id: string) => (
        <span className="font-medium text-gray-900">{id}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span className="text-gray-600">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "total_order_amount",
      key: "total_order_amount",
      render: (total: number) => (
        <Tag color="green" className="font-medium">
          ${Number(total).toFixed(2)}
        </Tag>
      ),
    },
    {
      title: "Manage order",
      key: "action",
      render: (record: TOrder) => (
        <div className="flex gap-5">
          {/* Select Dropdown for changing order status */}
          <Select
            defaultValue={record.orderStatus} // Display current status as default
            style={{ width: 120 }}
            onChange={(value) => handleOrderStatus(record._id, value)} // Call function on status change
            options={orderStatusOptions} // Provide options for statuses
          />

          {/* Additional buttons for delete or other actions */}
          <Tooltip title="Delete Order">
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteOrder(record._id)}
            >
              Delete
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold my-12">Manage Orders</h1>

      <div className="w-full overflow-x-auto  bg-white">
        <Table
          columns={columns}
          dataSource={orders}
          loading={isFetching}
          rowKey="_id"
          expandable={{
            expandedRowRender,
            defaultExpandAllRows: true,
            defaultExpandedRowKeys: ["0"],
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <div className="p-3" onClick={(e) => onExpand(record, e)}>
                  <ChevronRight className="h-10 animate-bounce w-10 text-red-500" />
                </div>
              ) : (
                <div className="p-3" onClick={(e) => onExpand(record, e)}>
                  <ChevronDown className="h-10 animate-bounce w-10 text-red-500" />
                </div>
              ),
          }}
          className="orders-table"
        />
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Are you sure? want to delete the order history!...</h2>
      </Modal>
    </div>
  );
};

export default Orders;
